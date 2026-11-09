/*
 * Spisak korisnika.
 *
 * Repozitorijum je javan, zato ovde NE pišemo korisnička imena (username),
 * već samo njihov otisak (SHA-256 od "kalorije:" + username malim slovima).
 * Iz otiska ne može da se pročita username, ali aplikacija može da proveri da li je ukucani tačan.
 *
 *   id    kratak ključ bez razmaka (koristi se za nalog u bazi: <id>@kalorije.app)
 *   name  ime koje se vidi u aplikaciji
 *   hash  otisak username-a
 *   cigare  true = u aplikaciji je ikonica za brojanje dana bez cigare
 *   cilj    "mrsavljenje" = dnevni cilj je potrošnja minus izabrani tempo (početno 0,3 kg nedeljno),
 *           proteini se podešavaju u profilu (početno 130 g dnevno); bez ovoga: održavanje
 *
 * Novog korisnika dodaje Claude: izračuna otisak, doda red ovde i napravi nalog u bazi (FIREBASE.md).
 */
window.KORISNICI = [
  { id: "milos", name: "Miloš", hash: "680a10ace9077f1bddcb71ef4135f360169ea1d56ad1a1f00cbb59e92a149730", cilj: "mrsavljenje" },
  { id: "aleksandra", name: "Aleksandra", hash: "07a9a2808928f5e57f256aacc71f5467d17db0b4228fe8b4c974ce4a948a5c44", cigare: true, cilj: "mrsavljenje" }
];
