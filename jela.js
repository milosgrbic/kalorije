/*
 * Standardna jela: skup namirnica iz foods.js pod jednim nazivom.
 * Količine su za 1 porciju. Kalorije i makroi se sabiraju automatski.
 *
 * Polja:
 *   id     jedinstveni ključ (ne menjati posle dodavanja)
 *   name   naziv jela
 *   cat    grupa u aplikaciji: "Zdravo i balansirano" ili "Domaća klasika"
 *   items  lista [id namirnice iz foods.js, količina u g ili ml]
 *
 * "Zdravo i balansirano" prati Harvardov Tanjir zdrave ishrane (pola tanjira povrće i voće,
 * četvrtina proteini, četvrtina integralne žitarice, zdrave masti) i ciljni odnos energije
 * otprilike: proteini 20–35 %, masti 20–35 %, ugljeni hidrati 40–55 %.
 */
window.JELA = [
  // Zdravo i balansirano
  { id: "zd_ovsena", name: "Ovsena kaša sa skyr-om i bobicama", cat: "Zdravo i balansirano", items: [["ovsene", 50], ["mleko15", 150], ["posnisir", 100], ["borovnica", 80], ["orah", 10]] },
  { id: "zd_omlet", name: "Omlet sa povrćem i integralnim hlebom", cat: "Zdravo i balansirano", items: [["jaje", 55], ["belance", 99], ["spanac", 50], ["paradajz", 80], ["paprika", 50], ["maslinovo", 5], ["integralnihleb", 60]] },
  { id: "zd_avokadotost", name: "Jaja i avokado na integralnom tostu", cat: "Zdravo i balansirano", items: [["jaje", 55], ["belance", 66], ["avokado", 40], ["integralnihleb", 70], ["paradajz", 80], ["rukola", 20]] },
  { id: "zd_skyrvoce", name: "Posni sir sa jagodama i čija semenkama", cat: "Zdravo i balansirano", items: [["posnisir", 200], ["jagoda", 150], ["chia", 10], ["med", 10]] },
  { id: "zd_smoothie", name: "Šejk od skyr-a, banane i ovsa", cat: "Zdravo i balansirano", items: [["posnisir", 150], ["banana", 120], ["mleko15", 150], ["ovsene", 20], ["kikirikiputer", 10]] },
  { id: "zd_sendvic", name: "Integralni sendvič sa ćuretinom i humusom", cat: "Zdravo i balansirano", items: [["integralnihleb", 80], ["curecinarezak", 60], ["humus", 30], ["salata", 30], ["paradajz", 60], ["krastavac", 50]] },
  { id: "zd_piletinakinoa", name: "Piletina sa kinoom i povrćem", cat: "Zdravo i balansirano", items: [["piletinafile", 150], ["kinoa", 60], ["brokoli", 150], ["sargarepa", 80], ["maslinovo", 10]] },
  { id: "zd_lososbatat", name: "Losos sa batatom i salatom", cat: "Zdravo i balansirano", items: [["losos", 130], ["batat", 250], ["rukola", 40], ["paradajz", 100], ["limun", 10]] },
  { id: "zd_curetinaheljda", name: "Ćuretina sa heljdom i salatom", cat: "Zdravo i balansirano", items: [["curetina", 150], ["heljda", 60], ["krastavac", 100], ["paradajz", 100], ["maslinovo", 7]] },
  { id: "zd_tunaleblebija", name: "Salata sa tunjevinom i leblebijom", cat: "Zdravo i balansirano", items: [["tunjevina", 80], ["leblebija", 100], ["krastavac", 100], ["paradajz", 100], ["luk", 20], ["salata", 50], ["maslinovo", 10]] },
  { id: "zd_testeninapiletina", name: "Integralna testenina sa piletinom i spanaćem", cat: "Zdravo i balansirano", items: [["integralnatestenina", 80], ["piletinafile", 120], ["spanac", 100], ["paradajzpasirani", 150], ["parmezan", 10], ["maslinovo", 5]] },
  { id: "zd_socivo", name: "Varivo od sočiva sa jogurtom", cat: "Zdravo i balansirano", items: [["socivo", 300], ["sargarepa", 80], ["luk", 40], ["paradajzpasirani", 100], ["maslinovo", 12], ["jogurt15", 150]] },
  { id: "zd_skusa", name: "Skuša sa integralnim pirinčem i povrćem", cat: "Zdravo i balansirano", items: [["skusa", 120], ["integralnipirinac", 70], ["tikvica", 150], ["paprika", 80]] },
  { id: "zd_junetinabulgur", name: "Junetina sa bulgurom i salatom", cat: "Zdravo i balansirano", items: [["junetina", 130], ["bulgur", 60], ["paradajz", 100], ["krastavac", 100], ["persun", 10], ["maslinovo", 7]] },
  { id: "zd_grcka", name: "Grčka salata sa piletinom i hlebom", cat: "Zdravo i balansirano", items: [["piletinapecena", 120], ["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["maslinecrne", 15], ["belisir", 30], ["maslinovo", 5], ["integralnihleb", 60]] },
  { id: "zd_tortilja", name: "Integralna tortilja sa piletinom i povrćem", cat: "Zdravo i balansirano", items: [["integralnatortilja", 60], ["piletinapecena", 100], ["paprika", 60], ["salata", 30], ["grckijogurt", 30], ["kukuruz", 30]] },
  { id: "zd_oslic", name: "Oslić sa kuvanim krompirom i spanaćem", cat: "Zdravo i balansirano", items: [["oslic", 200], ["krompirkuvan", 200], ["spanac", 150], ["maslinovo", 10]] },
  { id: "zd_pasuljpiletina", name: "Pasulj sa piletinom i kupus salatom", cat: "Zdravo i balansirano", items: [["pasulj", 250], ["piletinapecena", 80], ["kupus", 120], ["luk", 30], ["maslinovo", 7]] },

  // Domaća klasika
  { id: "kajgana3", name: "Kajgana od 3 jajeta", cat: "Domaća klasika", items: [["jaje", 165], ["suncokretulje", 5]] },
  { id: "jajahleb", name: "2 kuvana jajeta sa hlebom", cat: "Domaća klasika", items: [["jaje", 110], ["polubelihleb", 80]] },
  { id: "ovsenakasa", name: "Ovsena kaša sa bananom", cat: "Domaća klasika", items: [["ovsene", 50], ["mleko15", 200], ["banana", 120], ["med", 10]] },
  { id: "sendvicsunka", name: "Sendvič sa šunkom i sirom", cat: "Domaća klasika", items: [["polubelihleb", 80], ["pecenica", 40], ["gauda", 20], ["paradajz", 50]] },
  { id: "jogurtmusli", name: "Jogurt sa muslijem", cat: "Domaća klasika", items: [["grckijogurt", 150], ["musli", 40], ["borovnica", 50]] },
  { id: "sopska", name: "Šopska salata", cat: "Domaća klasika", items: [["paradajz", 150], ["krastavac", 100], ["paprika", 50], ["luk", 20], ["belisir", 50], ["suncokretulje", 10]] },
  { id: "piletinapirinac", name: "Piletina sa pirinčem", cat: "Domaća klasika", items: [["piletinapecena", 150], ["pirinackuvan", 200], ["suncokretulje", 10]] },
  { id: "bolonjeze", name: "Špagete bolonjeze", cat: "Domaća klasika", items: [["testeninakuvana", 200], ["mlevenojunece", 100], ["paradajz", 100], ["luk", 30], ["maslinovo", 10], ["parmezan", 10]] },
  { id: "cevapilepinja", name: "Ćevapi u lepinji sa lukom", cat: "Domaća klasika", items: [["cevapi", 200], ["pogaca", 100], ["luk", 30], ["kajmak", 20]] },
  { id: "pasuljprebranac", name: "Pasulj sa kobasicom", cat: "Domaća klasika", items: [["pasulj", 300], ["kobasica", 50], ["luk", 30], ["suncokretulje", 10]] },
  { id: "proteinski", name: "Proteinski šejk sa mlekom", cat: "Domaća klasika", items: [["whey", 30], ["mleko15", 300], ["banana", 120]] },
];
