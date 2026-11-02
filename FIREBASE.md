# Povezivanje zajedničke baze (Firebase)

Dok ovo nije urađeno, aplikacija radi u **lokalnom režimu**: prijava radi, ali se sve čuva samo
u browseru na tom uređaju i namirnice i jela se ne dele sa drugima.

Kad se poveže Firebase, dobija se:

- **zajednička baza namirnica i jela**: svi vide sve, svako dodaje, a menja i briše samo ono što je sam napravio,
- **lični obroci i profil** se čuvaju na nalogu: vidi ih samo vlasnik i isti su na telefonu i računaru.

Standardna lista (`foods.js`, `jela.js`) nije u bazi i niko je ne može obrisati iz aplikacije.

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
   - Kartica **Settings → User actions** → **isključi „Enable create (sign-up)“** → **Save**.
     Tako niko ne može sam sebi da napravi nalog, samo ti.
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

1. Javi Claude-u korisničko ime i ime za prikaz (npr. `Jovana2201` → „Jovana“).
   Claude doda red u `korisnici.js` i kaže ti email i lozinku za nalog.
2. Ti u Firebase konzoli: **Authentication → Users → Add user** sa tim emailom i lozinkom.

## Kako su podaci organizovani

| Gde | Šta | Ko vidi / menja |
|---|---|---|
| `foods.js`, `jela.js` | standardna lista | svi vide, menja se samo u repozitorijumu |
| `korisnici.js` | spisak korisnika (otisci imena) | menja se samo u repozitorijumu |
| `namirnice/{id}` | namirnice koje su dodali korisnici | svi prijavljeni vide i dodaju, menja/briše autor |
| `jela/{id}` | jela koja su napravili korisnici | svi prijavljeni vide i dodaju, menja/briše autor |
| `users/{uid}` | profil, nedavno izabrano | samo vlasnik |
| `users/{uid}/dani/{datum}` | obroci za taj dan | samo vlasnik |

Namirnica koju koristi neko jelo ne može da se obriše (aplikacija to sprečava), da se ne bi pokvarila tuđa jela.
