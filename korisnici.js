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
 *
 * Novog korisnika dodaje Claude (izračuna otisak), a nalog u bazi pravi admin (uputstvo u FIREBASE.md).
 */
window.KORISNICI = [
  { id: "milos", name: "Miloš", hash: "680a10ace9077f1bddcb71ef4135f360169ea1d56ad1a1f00cbb59e92a149730" },
  { id: "marko", name: "Marko", hash: "c5991d4de8f0a71da669867b095c0188097138a1cd0ddc50ebd7570e56812cea" },
  { id: "aleksandra", name: "Aleksandra", hash: "07a9a2808928f5e57f256aacc71f5467d17db0b4228fe8b4c974ce4a948a5c44" }
];
