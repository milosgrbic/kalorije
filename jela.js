/*
 * Gotova jela: skup namirnica iz foods.js pod jednim nazivom.
 * Količine su za 1 porciju. Kalorije i makroi se sabiraju automatski.
 *
 * Polja:
 *   id     jedinstveni ključ (ne menjati posle dodavanja)
 *   name   naziv jela
 *   items  lista [id namirnice iz foods.js, količina u g ili ml]
 *
 * Jela koja napraviš u aplikaciji čuvaju se u browseru. Ako želiš da neko
 * postane stalno, prepiši ga ovde.
 */
window.JELA = [
  { id: "kajgana3", name: "Kajgana od 3 jajeta", items: [["jaje", 165], ["suncokretulje", 5]] },
  { id: "jajahleb", name: "2 kuvana jajeta sa hlebom", items: [["jaje", 110], ["polubelihleb", 80]] },
  { id: "ovsenakasa", name: "Ovsena kaša sa bananom", items: [["ovsene", 50], ["mleko15", 200], ["banana", 120], ["med", 10]] },
  { id: "sendvicsunka", name: "Sendvič sa šunkom i sirom", items: [["polubelihleb", 80], ["pecenica", 40], ["gauda", 20], ["paradajz", 50]] },
  { id: "jogurtmusli", name: "Jogurt sa muslijem", items: [["grckijogurt", 150], ["musli", 40], ["borovnica", 50]] },
  { id: "sopska", name: "Šopska salata", items: [["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 50], ["suncokretulje", 10]] },
  { id: "piletinapirinac", name: "Piletina sa pirinčem", items: [["piletinapecena", 150], ["pirinackuvan", 200], ["suncokretulje", 10]] },
  { id: "bolonjeze", name: "Špagete bolonjeze", items: [["testeninakuvana", 200], ["mlevenojunece", 100], ["paradajz", 100], ["luk", 30], ["maslinovo", 10], ["parmezan", 10]] },
  { id: "cevapilepinja", name: "Ćevapi u lepinji sa lukom", items: [["cevapi", 200], ["pogaca", 100], ["luk", 30], ["kajmak", 20]] },
  { id: "pasuljprebranac", name: "Pasulj sa kobasicom", items: [["pasulj", 300], ["kobasica", 50], ["luk", 30], ["suncokretulje", 10]] },
  { id: "proteinski", name: "Proteinski šejk sa mlekom", items: [["whey", 30], ["mleko15", 300], ["banana", 120]] }
];
