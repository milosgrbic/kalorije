/*
 * Standardna jela: skup namirnica iz foods.js pod jednim nazivom.
 * Količine su za 1 porciju. Kalorije i makroi se sabiraju automatski.
 *
 * Polja:
 *   id     jedinstveni ključ (ne menjati posle dodavanja)
 *   name   naziv jela
 *   cat    "Dobra opcija" za jela koja se ističu na vrhu liste (ostala jela nemaju cat)
 *   items  lista [id namirnice iz foods.js, količina u g ili ml]
 *
 * Dobra opcija: jednostavna jela koja se lako naprave kod kuće od namirnica iz obične
 * prodavnice, zdrava i izbalansirana po Harvardovom Tanjiru zdrave ishrane
 * (pola tanjira povrće, četvrtina proteini, četvrtina žitarice ili krompir, malo zdravih masti),
 * sa odnosom energije otprilike: proteini 20–35 %, masti 20–35 %, ugljeni hidrati 35–55 %.
 *
 * Ostala jela: ono što se kod nas najčešće sprema kod kuće, klasika bez komplikovanja.
 */
window.JELA = [
  // Dobra opcija
  { id: "zd_omlet", name: "Omlet sa povrćem i integralnim hlebom", cat: "Dobra opcija", items: [["jaje", 55], ["belance", 99], ["spanac", 50], ["paradajz", 80], ["paprika", 50], ["maslinovo", 5], ["integralnihleb", 60]] },
  { id: "jz_jajakupus", name: "Kuvana jaja sa hlebom i kupus salatom", cat: "Dobra opcija", items: [["jaje", 110], ["polubelihleb", 80], ["kupus", 150]] },
  { id: "zd_avokadotost", name: "Jaja i avokado na integralnom hlebu", cat: "Dobra opcija", items: [["jaje", 55], ["belance", 66], ["avokado", 40], ["integralnihleb", 70], ["paradajz", 80]] },
  { id: "jz_ovsenajabuka", name: "Ovsena kaša sa jabukom, posnim sirom i orasima", cat: "Dobra opcija", items: [["ovsene", 50], ["mleko15", 200], ["posnisir", 100], ["jabuka", 120], ["orah", 10]] },
  { id: "zd_posnisirvoce", name: "Posni sir sa malinama, orasima i medom", cat: "Dobra opcija", items: [["posnisir", 200], ["malina", 125], ["orah", 10], ["med", 10]] },
  { id: "jz_mladisir", name: "Mladi sir sa povrćem i hlebom", cat: "Dobra opcija", items: [["mladisir", 150], ["paradajz", 100], ["krastavac", 100], ["paprika", 50], ["polubelihleb", 60]] },
  { id: "zd_sendvic", name: "Integralni sendvič sa ćuretinom i mladim sirom", cat: "Dobra opcija", items: [["integralnihleb", 80], ["curecinarezak", 60], ["mladisir", 40], ["salata", 30], ["paradajz", 60], ["krastavac", 50]] },
  { id: "zd_piletinapirinac", name: "Piletina sa integralnim pirinčem i povrćem", cat: "Dobra opcija", items: [["piletinafile", 150], ["integralnipirinac", 60], ["brokoli", 150], ["sargarepa", 80], ["maslinovo", 10]] },
  { id: "jz_batak", name: "Pileći batak sa krompirom i kupus salatom", cat: "Dobra opcija", items: [["pilecibatakbk", 180], ["krompirkuvan", 200], ["kupus", 150], ["suncokretulje", 7]] },
  { id: "zd_curetinaheljda", name: "Ćuretina sa heljdom i salatom", cat: "Dobra opcija", items: [["curetina", 150], ["heljda", 60], ["krastavac", 100], ["paradajz", 100], ["maslinovo", 7]] },
  { id: "zd_sopskapiletina", name: "Obrok salata sa piletinom i sirom", cat: "Dobra opcija", items: [["piletinapecena", 120], ["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 30], ["maslinovo", 5], ["integralnihleb", 90]] },
  { id: "zd_tunaleblebija", name: "Obrok salata sa tunjevinom i leblebijom", cat: "Dobra opcija", items: [["tunjevina", 80], ["leblebija", 100], ["krastavac", 100], ["paradajz", 100], ["luk", 20], ["salata", 50], ["maslinovo", 10]] },
  { id: "jz_testeninatuna", name: "Testenina sa tunjevinom i paradajzom", cat: "Dobra opcija", items: [["testenina", 70], ["tunjevina", 100], ["paradajzpasirani", 150], ["luk", 30], ["suncokretulje", 10]] },
  { id: "zd_testeninapiletina", name: "Integralna testenina sa piletinom i spanaćem", cat: "Dobra opcija", items: [["integralnatestenina", 80], ["piletinafile", 120], ["spanac", 100], ["paradajzpasirani", 150], ["parmezan", 10], ["maslinovo", 5]] },
  { id: "zd_tortilja", name: "Tortilja sa piletinom i povrćem", cat: "Dobra opcija", items: [["integralnatortilja", 60], ["piletinapecena", 100], ["paprika", 60], ["salata", 30], ["grckijogurt", 30], ["kukuruz", 30]] },
  { id: "jz_grasakpiletina", name: "Grašak sa piletinom", cat: "Dobra opcija", items: [["grasak", 200], ["piletinafile", 100], ["sargarepa", 50], ["luk", 30], ["suncokretulje", 7], ["polubelihleb", 40]] },
  { id: "jz_socivo", name: "Varivo od sočiva sa kiselim mlekom", cat: "Dobra opcija", items: [["socivo", 300], ["sargarepa", 80], ["luk", 40], ["paradajzpasirani", 100], ["suncokretulje", 12], ["kiselomleko", 180]] },
  { id: "zd_oslic", name: "Oslić sa krompirom i blitvom", cat: "Dobra opcija", items: [["oslic", 200], ["krompirkuvan", 200], ["blitva", 150], ["maslinovo", 10]] },
  { id: "zd_pastrmkablitva", name: "Pastrmka sa krompirom i blitvom", cat: "Dobra opcija", items: [["pastrmka", 200], ["krompirkuvan", 250], ["blitva", 150], ["maslinovo", 8], ["beliluk", 5]] },

  // Ostala jela
  { id: "kajgana3", name: "Kajgana od 3 jajeta", items: [["jaje", 165], ["suncokretulje", 5]] },
  { id: "jajahleb", name: "2 kuvana jajeta sa hlebom", items: [["jaje", 110], ["polubelihleb", 80]] },
  { id: "sendvicsunka", name: "Sendvič sa šunkom i sirom", items: [["polubelihleb", 80], ["pecenica", 40], ["gauda", 20], ["paradajz", 50]] },
  { id: "ovsenakasa", name: "Ovsena kaša sa bananom", items: [["ovsene", 50], ["mleko15", 200], ["banana", 120], ["med", 10]] },
  { id: "jogurtmusli", name: "Jogurt sa muslijem", items: [["grckijogurt", 150], ["musli", 40], ["borovnica", 50]] },
  { id: "palacinkeeurokrem", name: "Palačinke sa eurokremom", items: [["palacinke", 120], ["eurokrem", 40]] },
  { id: "burekjogurt", name: "Burek sa jogurtom", items: [["burek", 250], ["jogurt", 250]] },
  { id: "gibanicajogurt", name: "Gibanica sa jogurtom", items: [["gibanica", 150], ["jogurt", 250]] },
  { id: "jz_seljackiomlet", name: "Seljački omlet sa krompirom i paradajz salatom", items: [["jaje", 55], ["belance", 66], ["krompirkuvan", 150], ["luk", 50], ["suncokretulje", 5], ["paradajz", 150], ["polubelihleb", 40]] },
  { id: "sopska", name: "Šopska salata", items: [["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 50], ["suncokretulje", 10]] },
  { id: "piletinapirinac", name: "Piletina sa pirinčem", items: [["piletinapecena", 150], ["pirinackuvan", 200], ["suncokretulje", 10]] },
  { id: "pohovanapiletinapire", name: "Pohovana piletina sa pire krompirom", items: [["pohovanapiletina", 150], ["pirekrompir", 200], ["kupus", 100]] },
  { id: "jz_pirinacjaje", name: "Pirinač sa povrćem i jajima", items: [["pirinackuvan", 150], ["grasak", 80], ["sargarepa", 60], ["kukuruz", 40], ["jaje", 165], ["suncokretulje", 5]] },
  { id: "bolonjeze", name: "Špagete bolonjeze", items: [["testeninakuvana", 200], ["mlevenojunece", 100], ["paradajz", 100], ["luk", 30], ["maslinovo", 10], ["parmezan", 10]] },
  { id: "pasuljprebranac", name: "Pasulj sa kobasicom", items: [["pasulj", 300], ["kobasica", 50], ["luk", 30], ["suncokretulje", 10]] },
  { id: "prebranachleb", name: "Prebranac sa hlebom", items: [["prebranac", 250], ["polubelihleb", 50]] },
  { id: "jz_kupuspiletina", name: "Kupus varivo sa piletinom", items: [["kupus", 300], ["piletinafile", 100], ["krompirkuvan", 100], ["sargarepa", 50], ["luk", 30], ["suncokretulje", 7], ["paradajzpasirani", 50]] },
  { id: "sarmahleb", name: "Sarma sa hlebom", items: [["sarma", 300], ["polubelihleb", 50]] },
  { id: "gulaspire", name: "Gulaš sa pire krompirom", items: [["gulas", 300], ["pirekrompir", 200]] },
  { id: "musakasalata", name: "Musaka sa kiselim mlekom", items: [["musaka", 300], ["kiselomleko", 180]] },
  { id: "punjenepaprikepire", name: "Punjene paprike sa pire krompirom", items: [["punjenepaprike", 300], ["pirekrompir", 150]] },
  { id: "pljeskavicapomfrit", name: "Pljeskavica sa pomfritom i salatom", items: [["pljeskavica", 200], ["krompirpomfrit", 150], ["kupus", 100]] },
  { id: "cevapilepinja", name: "Ćevapi u lepinji sa lukom", items: [["cevapi", 200], ["pogaca", 100], ["luk", 30], ["kajmak", 20]] },
  { id: "jz_sardina", name: "Sardine sa krompir salatom i paradajzom", items: [["sardina", 90], ["krompirkuvan", 200], ["luk", 30], ["suncokretulje", 7], ["paradajz", 100]] },
  { id: "jz_pangasius", name: "Pangasius sa krompirom i šargarepom", items: [["pangasius", 200], ["krompirkuvan", 200], ["sargarepa", 100], ["suncokretulje", 10]] },
  { id: "zd_lososkrompir", name: "Losos sa krompirom i salatom", items: [["losos", 130], ["krompirkuvan", 250], ["salata", 60], ["paradajz", 100], ["limun", 10]] },
  { id: "zd_skusa", name: "Skuša sa pirinčem i povrćem", items: [["skusa", 120], ["integralnipirinac", 70], ["tikvica", 150], ["paprika", 80]] },
  { id: "pohovanioslickrompir", name: "Pohovani oslić sa krompir salatom", items: [["pohovanioslic", 150], ["krompirkuvan", 200], ["luk", 20], ["suncokretulje", 10]] },
  { id: "ribljacorbahleb", name: "Riblja čorba sa hlebom", items: [["ribljacorba", 400], ["polubelihleb", 60]] },
  { id: "przenisaransalata", name: "Prženi šaran sa kupus salatom", items: [["przenisaran", 200], ["kupus", 150], ["polubelihleb", 50]] },
  { id: "giricekrompir", name: "Girice sa krompir salatom", items: [["girice", 150], ["krompirkuvan", 150], ["luk", 20], ["suncokretulje", 7]] },
  { id: "proteinski", name: "Proteinski šejk sa mlekom i bananom", items: [["whey", 30], ["mleko15", 300], ["banana", 120]] },
];
