# Povezivanje zajedničke baze (Firebase)

Dok ovo nije urađeno, aplikacija radi u **lokalnom režimu**: sve se čuva samo u browseru.
Kad se poveže Firebase, dobija se:

- **prijava preko Google naloga**,
- **zajednička baza namirnica i jela**: svi vide sve, svako dodaje, a menja i briše samo ono što je sam napravio,
- **lični obroci i profil** se čuvaju na nalogu: vidi ih samo vlasnik i isti su na telefonu i računaru.

Standardna lista (`foods.js`, `jela.js`) nije u bazi i niko je ne može obrisati iz aplikacije.
Menja se samo izmenom tih fajlova u repozitorijumu.

Besplatni paket (Spark) je dovoljan: 50.000 čitanja i 20.000 upisa dnevno, a za 15 ljudi treba višestruko manje.

## Koraci (oko 10 minuta)

1. Otvori <https://console.firebase.google.com> i prijavi se Google nalogom.
2. **Create a project** → naziv `kalorije` → Google Analytics možeš da isključiš → **Create project**.
3. Levo **Build → Authentication → Get started**.
   - Kartica **Sign-in method** → **Google** → uključi **Enable** → izaberi svoj email za podršku → **Save**.
   - Kartica **Settings → Authorized domains** → **Add domain** → upiši `milosgrbic.github.io` → **Add**.
4. Levo **Build → Firestore Database → Create database**.
   - Lokacija: `eur3 (europe-west)`.
   - Izaberi **Start in production mode** → **Create**.
5. U Firestore-u otvori karticu **Rules**, obriši sve što piše i nalepi ceo sadržaj fajla
   [`firestore.rules`](firestore.rules) → **Publish**.
6. Gore levo zupčanik **⚙ → Project settings** → dole **Your apps** → ikonica **`</>`** (Web).
   - Nadimak: `Kalorije`, **ne** štikliraj Firebase Hosting → **Register app**.
   - Prikazaće se `const firebaseConfig = { apiKey: ..., ... }`. Kopiraj taj objekat.
7. Nalepi ga u [`firebase-config.js`](firebase-config.js) umesto `null`:

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

   Ili mi samo pošalji taj objekat i ja ću ga ubaciti. Ti podaci nisu tajni, bazu štite pravila iz koraka 5.

Posle toga, otvori sajt, klikni ikonicu profila → **Prijavi se preko Google-a**.
Ono što je već uneto na tom uređaju automatski se prebacuje na nalog pri prvoj prijavi.

## Kako su podaci organizovani

| Gde | Šta | Ko vidi / menja |
|---|---|---|
| `foods.js`, `jela.js` | standardna lista | svi vide, menja se samo u repozitorijumu |
| `namirnice/{id}` | namirnice koje su dodali korisnici | svi prijavljeni vide i dodaju, menja/briše autor |
| `jela/{id}` | jela koja su napravili korisnici | svi prijavljeni vide i dodaju, menja/briše autor |
| `users/{uid}` | profil, nedavno izabrano | samo vlasnik |
| `users/{uid}/dani/{datum}` | obroci za taj dan | samo vlasnik |

Namirnica koju koristi neko jelo ne može da se obriše (aplikacija to sprečava), da se ne bi pokvarila tuđa jela.
