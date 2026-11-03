/*
 * Standardna jela: skup namirnica iz foods.js pod jednim nazivom.
 * Količine su za 1 porciju. Kalorije i makroi se sabiraju automatski.
 *
 * Polja:
 *   id     jedinstveni ključ (ne menjati posle dodavanja)
 *   name   naziv jela
 *   cat    grupa u aplikaciji: "Domaće", "Zdravo" ili "Jeftino i zdravo"
 *   items  lista [id namirnice iz foods.js, količina u g ili ml]
 *
 * Domaće: klasična srpska jela, onako kako se obično jedu.
 * Zdravo i Jeftino i zdravo: prate Harvardov Tanjir zdrave ishrane (pola tanjira povrće,
 * četvrtina proteini, četvrtina žitarice ili krompir, malo zdravih masti) i ciljni odnos energije
 * otprilike: proteini 20–35 %, masti 20–35 %, ugljeni hidrati 40–55 %.
 * Jeftino i zdravo koristi jeftine namirnice iz svake prodavnice: jaja, mahunarke, ovsene,
 * kupus, krompir, pileći batak, konzerve ribe, smrznuto povrće.
 * Sve namirnice su one koje se kod nas kupuju i jedu.
 */
window.JELA = [
  // Domaće
  { id: "kajgana3", name: "Kajgana od 3 jajeta", cat: "Domaće", items: [["jaje", 165], ["suncokretulje", 5]] },
  { id: "jajahleb", name: "2 kuvana jajeta sa hlebom", cat: "Domaće", items: [["jaje", 110], ["polubelihleb", 80]] },
  { id: "ovsenakasa", name: "Ovsena kaša sa bananom", cat: "Domaće", items: [["ovsene", 50], ["mleko15", 200], ["banana", 120], ["med", 10]] },
  { id: "sendvicsunka", name: "Sendvič sa šunkom i sirom", cat: "Domaće", items: [["polubelihleb", 80], ["pecenica", 40], ["gauda", 20], ["paradajz", 50]] },
  { id: "jogurtmusli", name: "Jogurt sa muslijem", cat: "Domaće", items: [["grckijogurt", 150], ["musli", 40], ["borovnica", 50]] },
  { id: "sopska", name: "Šopska salata", cat: "Domaće", items: [["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 50], ["suncokretulje", 10]] },
  { id: "piletinapirinac", name: "Piletina sa pirinčem", cat: "Domaće", items: [["piletinapecena", 150], ["pirinackuvan", 200], ["suncokretulje", 10]] },
  { id: "bolonjeze", name: "Špagete bolonjeze", cat: "Domaće", items: [["testeninakuvana", 200], ["mlevenojunece", 100], ["paradajz", 100], ["luk", 30], ["maslinovo", 10], ["parmezan", 10]] },
  { id: "cevapilepinja", name: "Ćevapi u lepinji sa lukom", cat: "Domaće", items: [["cevapi", 200], ["pogaca", 100], ["luk", 30], ["kajmak", 20]] },
  { id: "pasuljprebranac", name: "Pasulj sa kobasicom", cat: "Domaće", items: [["pasulj", 300], ["kobasica", 50], ["luk", 30], ["suncokretulje", 10]] },
  { id: "pohovanioslickrompir", name: "Pohovani oslić sa krompir salatom", cat: "Domaće", items: [["pohovanioslic", 150], ["krompirkuvan", 200], ["luk", 20], ["suncokretulje", 10]] },
  { id: "ribljacorbahleb", name: "Riblja čorba sa hlebom", cat: "Domaće", items: [["ribljacorba", 400], ["polubelihleb", 60]] },
  { id: "przenisaransalata", name: "Prženi šaran sa kupus salatom", cat: "Domaće", items: [["przenisaran", 200], ["kupus", 150], ["polubelihleb", 50]] },
  { id: "giricekrompir", name: "Girice sa krompir salatom", cat: "Domaće", items: [["girice", 150], ["krompirkuvan", 150], ["luk", 20], ["suncokretulje", 7]] },
  { id: "sarmahleb", name: "Sarma sa hlebom", cat: "Domaće", items: [["sarma", 300], ["polubelihleb", 50]] },
  { id: "gulaspire", name: "Gulaš sa pire krompirom", cat: "Domaće", items: [["gulas", 300], ["pirekrompir", 200]] },

  // Zdravo
  { id: "zd_ovsena", name: "Ovsena kaša sa posnim sirom i malinama", cat: "Zdravo", items: [["ovsene", 50], ["mleko15", 150], ["posnisir", 100], ["malina", 100], ["orah", 10]] },
  { id: "zd_omlet", name: "Omlet sa povrćem i integralnim hlebom", cat: "Zdravo", items: [["jaje", 55], ["belance", 99], ["spanac", 50], ["paradajz", 80], ["paprika", 50], ["maslinovo", 5], ["integralnihleb", 60]] },
  { id: "zd_jajasir", name: "Jaja i mladi sir sa povrćem i integralnim hlebom", cat: "Zdravo", items: [["jaje", 55], ["belance", 66], ["mladisir", 50], ["integralnihleb", 70], ["paradajz", 80], ["krastavac", 60]] },
  { id: "zd_posnisirvoce", name: "Posni sir sa malinama, orasima i medom", cat: "Zdravo", items: [["posnisir", 200], ["malina", 125], ["orah", 10], ["med", 10]] },
  { id: "zd_sejk", name: "Šejk od jogurta, posnog sira, banane i ovsa", cat: "Zdravo", items: [["posnisir", 150], ["jogurt15", 200], ["banana", 100], ["ovsene", 20], ["orah", 10]] },
  { id: "zd_sendvic", name: "Integralni sendvič sa ćuretinom i mladim sirom", cat: "Zdravo", items: [["integralnihleb", 80], ["curecinarezak", 60], ["mladisir", 40], ["salata", 30], ["paradajz", 60], ["krastavac", 50]] },
  { id: "zd_piletinapirinac", name: "Piletina sa integralnim pirinčem i povrćem", cat: "Zdravo", items: [["piletinafile", 150], ["integralnipirinac", 60], ["brokoli", 150], ["sargarepa", 80], ["maslinovo", 10]] },
  { id: "zd_curetinaheljda", name: "Ćuretina sa heljdom i salatom", cat: "Zdravo", items: [["curetina", 150], ["heljda", 60], ["krastavac", 100], ["paradajz", 100], ["maslinovo", 7]] },
  { id: "zd_testeninapiletina", name: "Integralna testenina sa piletinom i spanaćem", cat: "Zdravo", items: [["integralnatestenina", 80], ["piletinafile", 120], ["spanac", 100], ["paradajzpasirani", 150], ["parmezan", 10], ["maslinovo", 5]] },
  { id: "zd_junetina", name: "Junetina na žaru sa pirinčem i salatom", cat: "Zdravo", items: [["junetina", 130], ["pirinackuvan", 150], ["paradajz", 100], ["krastavac", 100], ["maslinovo", 7]] },
  { id: "zd_sopskapiletina", name: "Šopska salata sa piletinom i hlebom", cat: "Zdravo", items: [["piletinapecena", 120], ["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 30], ["maslinovo", 5], ["integralnihleb", 90]] },
  { id: "zd_tortilja", name: "Tortilja sa piletinom i povrćem", cat: "Zdravo", items: [["integralnatortilja", 60], ["piletinapecena", 100], ["paprika", 60], ["salata", 30], ["grckijogurt", 30], ["kukuruz", 30]] },
  { id: "zd_lososkrompir", name: "Losos sa kuvanim krompirom i salatom", cat: "Zdravo", items: [["losos", 130], ["krompirkuvan", 250], ["salata", 60], ["paradajz", 100], ["limun", 10]] },
  { id: "zd_pastrmkablitva", name: "Pastrmka sa blitvom i krompirom", cat: "Zdravo", items: [["pastrmka", 200], ["krompirkuvan", 200], ["blitva", 150], ["maslinovo", 10], ["beliluk", 5]] },
  { id: "zd_smudj", name: "Smuđ sa grilovanim povrćem i pirinčem", cat: "Zdravo", items: [["smudj", 200], ["tikvica", 150], ["paprika", 100], ["patlidzan", 100], ["maslinovo", 10], ["pirinackuvan", 120]] },
  { id: "zd_lignje", name: "Lignje na žaru sa blitvom i krompirom", cat: "Zdravo", items: [["lignje", 200], ["blitva", 150], ["krompirkuvan", 150], ["maslinovo", 10], ["beliluk", 5]] },
  { id: "zd_brancin", name: "Brancin sa blitvom i krompirom", cat: "Zdravo", items: [["brancin", 220], ["blitva", 150], ["krompirkuvan", 200], ["maslinovo", 10], ["limun", 10]] },
  { id: "zd_skusa", name: "Skuša sa integralnim pirinčem i povrćem", cat: "Zdravo", items: [["skusa", 120], ["integralnipirinac", 70], ["tikvica", 150], ["paprika", 80]] },
  { id: "zd_tunaleblebija", name: "Salata sa tunjevinom i leblebijom", cat: "Zdravo", items: [["tunjevina", 80], ["leblebija", 100], ["krastavac", 100], ["paradajz", 100], ["luk", 20], ["salata", 50], ["maslinovo", 10]] },
  { id: "zd_oslic", name: "Oslić sa kuvanim krompirom i spanaćem", cat: "Zdravo", items: [["oslic", 200], ["krompirkuvan", 200], ["spanac", 150], ["maslinovo", 10]] },
  { id: "zd_plodovimora", name: "Integralna testenina sa plodovima mora", cat: "Zdravo", items: [["integralnatestenina", 80], ["plodovimora", 150], ["paradajzpasirani", 100], ["beliluk", 5], ["maslinovo", 10], ["persun", 10]] },
  { id: "proteinski", name: "Proteinski šejk sa mlekom i bananom", cat: "Zdravo", items: [["whey", 30], ["mleko15", 300], ["banana", 120]] },

  // Jeftino i zdravo
  { id: "jz_ovsenajabuka", name: "Ovsena kaša sa jabukom, posnim sirom i orasima", cat: "Jeftino i zdravo", items: [["ovsene", 50], ["mleko15", 200], ["posnisir", 100], ["jabuka", 120], ["orah", 10]] },
  { id: "jz_proja", name: "Proja sa posnim sirom i jogurtom", cat: "Jeftino i zdravo", items: [["proja", 100], ["posnisir", 100], ["jogurt15", 200]] },
  { id: "jz_jajakupus", name: "Kuvana jaja sa hlebom i kupus salatom", cat: "Jeftino i zdravo", items: [["jaje", 110], ["polubelihleb", 80], ["kupus", 150]] },
  { id: "jz_mladisir", name: "Mladi sir sa povrćem i hlebom", cat: "Jeftino i zdravo", items: [["mladisir", 150], ["paradajz", 100], ["krastavac", 100], ["paprika", 50], ["polubelihleb", 60]] },
  { id: "jz_seljackiomlet", name: "Seljački omlet sa krompirom i paradajz salatom", cat: "Jeftino i zdravo", items: [["jaje", 55], ["belance", 66], ["krompirkuvan", 150], ["luk", 50], ["suncokretulje", 5], ["paradajz", 150], ["polubelihleb", 40]] },
  { id: "jz_batak", name: "Pileći batak sa krompirom i kupus salatom", cat: "Jeftino i zdravo", items: [["pilecibatakbk", 180], ["krompirkuvan", 200], ["kupus", 150], ["suncokretulje", 7]] },
  { id: "jz_grasakpiletina", name: "Grašak sa piletinom", cat: "Jeftino i zdravo", items: [["grasak", 200], ["piletinafile", 100], ["sargarepa", 50], ["luk", 30], ["suncokretulje", 7], ["polubelihleb", 40]] },
  { id: "jz_pasuljpiletina", name: "Pasulj sa piletinom i kupus salatom", cat: "Jeftino i zdravo", items: [["pasulj", 250], ["piletinapecena", 80], ["kupus", 120], ["luk", 30], ["suncokretulje", 7]] },
  { id: "jz_socivo", name: "Varivo od sočiva sa kiselim mlekom", cat: "Jeftino i zdravo", items: [["socivo", 300], ["sargarepa", 80], ["luk", 40], ["paradajzpasirani", 100], ["suncokretulje", 12], ["kiselomleko", 180]] },
  { id: "jz_sardina", name: "Sardine sa krompir salatom i paradajzom", cat: "Jeftino i zdravo", items: [["sardina", 90], ["krompirkuvan", 200], ["luk", 30], ["suncokretulje", 7], ["paradajz", 100]] },
  { id: "jz_testeninatuna", name: "Testenina sa tunjevinom i paradajzom", cat: "Jeftino i zdravo", items: [["testenina", 70], ["tunjevina", 100], ["paradajzpasirani", 150], ["luk", 30], ["suncokretulje", 10]] },
  { id: "jz_pirinacjaje", name: "Pirinač sa povrćem i jajima", cat: "Jeftino i zdravo", items: [["pirinackuvan", 150], ["grasak", 80], ["sargarepa", 60], ["kukuruz", 40], ["jaje", 165], ["suncokretulje", 5]] },
  { id: "jz_kupuspiletina", name: "Kupus varivo sa piletinom", cat: "Jeftino i zdravo", items: [["kupus", 300], ["piletinafile", 100], ["krompirkuvan", 100], ["sargarepa", 50], ["luk", 30], ["suncokretulje", 7], ["paradajzpasirani", 50]] },
  { id: "jz_pangasius", name: "Pangasius sa krompirom i šargarepom", cat: "Jeftino i zdravo", items: [["pangasius", 200], ["krompirkuvan", 200], ["sargarepa", 100], ["suncokretulje", 10]] },
];
