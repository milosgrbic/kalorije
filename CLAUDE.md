# bolja.ja — uputstvo za rad na projektu

Aplikacija je **u stvarnoj upotrebi**: koriste je Miloš i Aleksandra (njegova sestra) i u bazi
su njihovi pravi podaci. Sajt: https://milosgrbic.github.io/kalorije/ (GitHub Pages sa grane `main`),
baza: Firebase projekat `kalorije-df8eb` (vidi `FIREBASE.md`).

## Najvažnije pravilo: ne sme se oštetiti ništa od već unetih podataka

Pre svake izmene proveriti da li može da utiče na postojeće podatke u bazi ili u browseru.
**Ako postoji i najmanja šansa da se nešto izgubi, prepiše, pomeri ili drugačije protumači — prvo pitati Miloša.**

To posebno znači:

- **Format podataka je ugovor.** Ne menjati imena polja, oblik zapisa ni značenje vrednosti u
  `users/{uid}` (profile, recent, streak, best, weights, smoke), `users/{uid}/dani/{datum}`
  (meals po obrocima, vezbanje), `namirnice`, `jela`, `ekipa`, kao ni ključeve u localStorage
  (`kalorije.*`). Ako je promena neophodna: stari oblik mora i dalje da se čita (migracija pri
  učitavanju, kao kod "ostalo" → "uzine"), bez brisanja originala dok se ne proveri.
- **Ne brisati i ne prepisivati** tuđe ili stare zapise. Postojeće automatsko brisanje: samo obroci
  stariji od 15 dana (dogovoreno). Ništa drugo se ne briše automatski.
- **Ne pokretati testove ni probe nad pravom bazom** bez pitanja. Testirati lokalno (lažna baza u
  testovima) ili u probnoj verziji (`alati/napravi-probu.py`, Claude artifact u lokalnom režimu).
  Ako je provera uživo neophodna (npr. pravila), pitati, koristiti očigledno test zapise i obrisati ih.
- **Pravila (`firestore.rules`)** moraju i dalje da propuštaju sve što aplikacija već upisuje;
  nova pravila objavljuje Miloš, a aplikaciju koja ih zahteva objaviti tek posle toga.
- **Korisnici (`korisnici.js`)**: ne menjati `id` ni otisak postojećeg korisnika (od `id` zavise
  nalog u bazi i ključevi u browseru).
- Pre objave: pokrenuti sve testove i `python3 alati/nova-verzija.py`, pa tek onda spojiti u `main`.
