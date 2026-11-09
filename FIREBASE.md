# Povezivanje zajedničke baze (Firebase)

Dok ovo nije urađeno, aplikacija radi u **lokalnom režimu**: prijava radi, ali se sve čuva samo
u browseru na tom uređaju i namirnice i jela se ne dele sa drugima.

Kad se poveže Firebase, dobija se:

- **zajednička baza namirnica i jela**: svi vide sve, svako dodaje, a menja i briše samo ono što je sam napravio,
- **lični obroci i profil** se čuvaju na nalogu: vidi ih samo vlasnik i isti su na telefonu i računaru.

Standardna lista namirnica (`foods.js`) nije u bazi i niko je ne može obrisati iz aplikacije.

Besplatni paket (Spark) je dovoljan: 50.000 čitanja i 20.000 upisa dnevno.

## Kako radi prijava

Svako se prijavljuje samo **korisničkim imenom** (npr. `Ime1234`), bez šifre.
U aplikaciji se vidi samo ime (npr. „Miloš“).

- Spisak korisnika je u [`korisnici.js`](korisnici.js). Pošto je repozitorijum javan, tamo **nema
  korisničkih imena**, već samo njihov otisak (hash), iz kog ime ne može da se pročita.
- U Firebase-u svaki korisnik ima nalog:
  - **email:** `<id>@kalorije.app` (`id` je iz `korisnici.js`, npr. `milos@kalorije.app`)
  - **lozinka:** `kalorije-` + korisničko ime **malim slovima** (npr. za `Ime1234` → `kalorije-ime1234`)

  Lozinku korisnik nikad ne kuca, aplikacija je sama složi iz korisničkog imena.

Velika i mala slova u korisničkom imenu nisu bitna pri prijavi.

## Koraci (oko 10 minuta, jednom)

1. Otvori <https://console.firebase.google.com> i prijavi se svojim Google nalogom (samo ti kao admin).
2. **Create a project** → naziv `kalorije` → Google Analytics možeš da isključiš → **Create project**.
3. Levo **Build → Authentication → Get started**.
   - Kartica **Sign-in method** → **Email/Password** → uključi prvi prekidač (**Enable**) → **Save**.
     (Drugi, „Email link“, ostavi isključen.)
   - Kartica **Settings → User actions** → „Enable create (sign-up)“ je ostavljeno **uključeno**,
     da bi Claude mogao da pravi naloge (vidi „Dodavanje novog korisnika“).
4. Kartica **Users → Add user**, za svakog korisnika (email i lozinka po pravilu iznad).
5. Levo **Build → Firestore Database → Create database**.
   - Lokacija: `eur3 (europe-west)`.
   - Izaberi **Start in production mode** → **Create**.
6. U Firestore-u otvori karticu **Rules**, obriši sve što piše i nalepi ceo sadržaj fajla
   [`firestore.rules`](firestore.rules) → **Publish**.
7. Gore levo zupčanik **⚙ → Project settings** → dole **Your apps** → ikonica **`</>`** (Web).
   - Nadimak: `Kalorije`, **ne** štikliraj Firebase Hosting → **Register app**.
   - Prikazaće se `const firebaseConfig = { apiKey: ..., ... }`. Kopiraj taj objekat.
8. Nalepi ga u [`firebase-config.js`](firebase-config.js) umesto `null`, ili ga pošalji Claude-u.
   Ti podaci nisu tajni, bazu štite pravila iz koraka 6.

Pri prvoj prijavi posle povezivanja, ono što je korisnik već uneo na tom uređaju prebacuje se na njegov nalog.

## Dodavanje novog korisnika

Registracija novih naloga (Authentication → Settings → User actions → „Enable create (sign-up)“)
je namerno **ostavljena uključena**, da bi Claude mogao sam da napravi nalog:

1. Javi Claude-u korisničko ime i ime za prikaz (npr. `Jovana2201` → „Jovana“).
2. Claude doda red u `korisnici.js`, napravi nalog `<id>@kalorije.app` sa lozinkom po pravilu iznad
   i proveri da prijava radi.

Ako se registracija jednom isključi, nalog pravi admin u konzoli: **Authentication → Users → Add user**.

Napomena: dok je registracija uključena, neko ko zna kako mogao bi sebi da napravi nalog i dodaje
namirnice i jela u zajedničku listu. Tuđe profile i obroke ni tada ne može da vidi (pravila u `firestore.rules`).

## Kako su podaci organizovani

| Gde | Šta | Ko vidi / menja | Koliko dugo |
|---|---|---|---|
| `foods.js` | standardna lista namirnica | svi vide, menja se samo u repozitorijumu | zauvek |
| `korisnici.js` | spisak korisnika (otisci imena) | menja se samo u repozitorijumu | zauvek |
| `namirnice/{id}` | namirnice koje su dodali korisnici | svi prijavljeni vide i dodaju, menja/briše autor | zauvek |
| `jela/{id}` | jela koja su napravili korisnici | svi prijavljeni vide i dodaju, menja/briše autor | zauvek |
| `ekipa/{uid}` | ime, % današnjeg cilja, niz dana, najbolji niz, dani bez cigare | svi prijavljeni vide, piše vlasnik | zauvek (jedan mali zapis po osobi) |
| `users/{uid}` | profil, nedavno izabrano, niz dana (datum početka), najbolji niz, težina, dan poslednje cigare | samo vlasnik | zauvek |
| `users/{uid}/dani/{datum}` | obroci i vežbanje za taj dan | samo vlasnik | **15 dana**, stariji se brišu sami |

Težina se čuva štedljivo: prvo merenje, poslednjih 8 merenja i po jedan prosek za svaki stariji mesec.

Namirnica koju koristi neko jelo ne može da se obriše (aplikacija to sprečava), da se ne bi pokvarila tuđa jela.

## Pravila (firestore.rules)

Pravila pored „ko sme šta“ proveravaju i **oblik podataka**: dozvoljena su samo poznata polja,
brojevi u razumnim granicama i nazivi do 120 znakova. Posle svake izmene fajla `firestore.rules`
treba ga ponovo nalepiti u **Firestore Database → Rules → Publish**.
