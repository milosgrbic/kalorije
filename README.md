# Kalorije

Aplikacija za praćenje kalorija za našu ekipu (po uzoru na MyFitnessPal), prilagođena Srbiji.
Radi u browseru i na telefonu (otvori sajt → „Dodaj na početni ekran“).

**Sajt:** https://milosgrbic.github.io/kalorije/

## Šta ima
- **Profil** (ikonica gore desno): pol, visina, težina, datum rođenja, aktivnost → BMI, bazalni metabolizam i dnevna potrošnja (Mifflin-St Jeor × faktor aktivnosti).
- **Brzinomer**: unete kalorije u odnosu na dnevnu potrošnju, plus proteini, masti i UH.
- **Obroci**: doručak, ručak, večera, užine, ostalo. Dodavanje iz liste (g ili ml) ili ručno.
- **Namirnice i jela**: pretraga, makroi, nedavno izabrano. Jelo je skup namirnica i sabira se po porcijama.
- **Dve vrste liste**: standardna (`foods.js`, `jela.js`, niko je ne briše) i od korisnika (zajednička baza, autor briše svoje).

## Fajlovi
| Fajl | Šta je |
|---|---|
| `index.html` | cela aplikacija |
| `foods.js` | standardna lista namirnica (na 100 g / 100 ml) |
| `jela.js` | standardna lista jela |
| `db.js` | čuvanje podataka: lokalno ili Firebase |
| `firebase-config.js` | podešavanja baze (prazno = lokalni režim) |
| `firestore.rules` | pravila ko sme šta u bazi |
| `FIREBASE.md` | uputstvo za povezivanje baze |

## Objavljivanje (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
Izmene se rade na posebnoj grani i spajaju u `main` kad su provereni.
