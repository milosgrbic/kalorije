# bolja.ja

Lična aplikacija za Miloša i Aleksandru: praćenje ishrane, vežbanja, težine i dana bez cigare (po uzoru na MyFitnessPal), prilagođena Srbiji.
Radi u browseru i na telefonu (otvori sajt → „Dodaj na početni ekran“).

**Sajt:** https://milosgrbic.github.io/kalorije/

## Šta ima
- **Prijava** korisničkim imenom (spisak u `korisnici.js`, bez šifre). U aplikaciji se vidi samo ime.
- **Profil** (ikonica gore desno): pol, visina, težina, datum rođenja, aktivnost → BMI, bazalni metabolizam i dnevna potrošnja (Mifflin-St Jeor × faktor aktivnosti).
- **Brzinomer**: unete kalorije u odnosu na dnevnu potrošnju, plus proteini, masti i UH.
- **Obroci**: doručak, ručak, večera, užina i ostalo. Dodavanje iz liste (g ili ml) ili ručno.
  Čuva se poslednjih 15 dana (strelicama gore se lista unazad); stariji dani se brišu,
  ali niz dana, profil, težina i namirnice i jela koje ste napravili ostaju zauvek.
- **Vežbanje**: okruglo dugme sa tegom u uglu brzinomera; potrošene kalorije su bonus i ne menjaju dnevni cilj.
- **Cilj** (bira se u profilu, „Moji podaci“; početno iz `korisnici.js`): **mršavljenje** = potrošnja minus izabrani tempo (početno 0,3 kg nedeljno ≈ 330 kcal, ne ispod 1.200 / 1.500), proteini početno 130 g; **održavanje i mišići** = potrošnja + izabrani višak (početno 0), proteini početno 1,8 g/kg. Proteini se uvek mogu podesiti kao g po kg.
- **Datumi** se unose kao DD/MM/GGGG.
- **Ekipa** (ikonica karike): vidimo jedno drugo: % današnjeg cilja, niz dana i dane bez cigare. Dodir na osobu otvara njene obroke po danima (do 14 dana unazad), samo za gledanje: ništa se ne može menjati. Profil, težina i merenja ostaju privatni.
- **Bez cigare** (dugme sa cigaretom i brojem dana u baneru, za korisnike sa `cigare: true` u `korisnici.js`): dani od poslednje cigare i ušteđen novac (450 din dnevno); dugme „Prekršila sam“ vraća brojanje na nulu.
- **Niz dana** (vatrica pored imena): broj uzastopnih dana sa bar jednim unetim obrokom.
- **Merenja**: težina i obimi (struk, kukovi, grudi, nadlaktica, butina, vrat, list); jednom nedeljno aplikacija ponudi merenje; u profilu je grafikon za svaku vrstu. Sva merenja se čuvaju zauvek.
- **Izvezi**: dugme na dnu pravi PDF dana koji je otvoren i otvara meni za deljenje (Viber, WhatsApp, mejl…).
- **Namirnice i jela**: pretraga, makroi, nedavno izabrano. Jelo je skup namirnica i sabira se po porcijama.
- **Namirnice**: standardna lista (`foods.js`, niko je ne briše) i one koje dodamo mi. **Jela** pravimo sami (skup namirnica sa količinama); vidimo ih oboje, briše ih onaj ko ih je napravio. Pamte se 3 poslednje izabrane namirnice i 3 jela.

## Fajlovi
| Fajl | Šta je |
|---|---|
| `index.html` | cela aplikacija |
| `foods.js` | standardna lista namirnica (na 100 g / 100 ml) |
| `korisnici.js` | spisak korisnika (otisci korisničkih imena, ne sama imena) |
| `db.js` | prijava i čuvanje podataka: lokalno ili Firebase |
| `firebase-config.js` | podešavanja baze (prazno = lokalni režim) |
| `ikone/`, `icon-*.png`, `favicon*` | avokado ikonica (original u `ikone/`) |
| `lib/` | jsPDF i font za PDF izvoz (DejaVu Sans, sa č ć đ š ž) |
| `version.json`, `alati/nova-verzija.py` | oznaka verzije; pre svake objave pokrenuti `python3 alati/nova-verzija.py`, pa se aplikacija svima sama osveži |
| `firestore.rules` | pravila ko sme šta u bazi |
| `FIREBASE.md` | uputstvo za povezivanje baze |

## Objavljivanje (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
Izmene se rade na posebnoj grani i spajaju u `main` kad su provereni.
