/*
 * Probna verzija bolja.ja: izmišljeni podaci za Aleksandru, samo u ovom browseru.
 * Učitava se pre db.js, pa je Aleksandra odmah "prijavljena" u lokalnom režimu.
 */
(function () {
  var SEED = "bolja.proba.v2";
  function key(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function ago(n) { var d = new Date(); d.setDate(d.getDate() - n); return key(d); }
  function seed() {
    var item = function (id, name, qty, kcal, p, f, c) { return { food: id, name: name, qty: qty, unit: "g", kcal: kcal, p: p, f: f, c: c }; };
    var dish = function (id, name, kcal, p, f, c) { return { dish: id, name: name, qty: 1, unit: "porc.", kcal: kcal, p: p, f: f, c: c }; };
    var days = {};
    // poslednjih 9 dana sa obrocima (niz dana), danas samo doručak
    for (var i = 1; i <= 9; i++) {
      days[ago(i)] = {
        dorucak: [dish("demo_ovsena", "Moja ovsena kaša", 489, 27.6, 13.6, 65.8)],
        rucak: [dish("demo_piletina", "Piletina sa pirinčem i brokolijem", 548, 43.9, 13.3, 63.2)],
        vecera: [item("tunjevina", "Tunjevina u salamuri (oceđena)", 80, 93, 20.8, 0.8, 0), item("paradajz", "Paradajz", 200, 36, 1.8, 0.4, 7.8)],
        uzine: [item("jabuka", "Jabuka", 180, 94, 0.5, 0.4, 25.2)]
      };
      if (i % 3 === 0) days[ago(i)].vezbanje = 250;
    }
    days[ago(0)] = { dorucak: [item("jaje", "Jaje (celo)", 110, 157, 13.9, 10.5, 0.8), item("integralnihleb", "Integralni hleb", 40, 99, 5.2, 1.4, 16.4)] };
    var state = {
      profile: { sex: "f", height: 168, weight: 71.2, dob: "1995-04-17", activity: 1.375 },
      days: days, recent: ["jaje", "integralnihleb", "jabuka"], recentDishes: ["demo_ovsena", "demo_piletina"],
      streak: { start: ago(9), last: ago(0) }, best: 10,
      weights: { start: { d: ago(63), kg: 75 }, months: {},
        entries: [[56, 74.6], [49, 74.1], [42, 73.5], [35, 73.2], [28, 72.6], [21, 72.3], [14, 71.8], [6, 71.2]].map(function (e) { return { d: ago(e[0]), kg: e[1] }; }) },
      smoke: { since: ago(12) }
    };
    localStorage.setItem("kalorije.v1.aleksandra", JSON.stringify(state));
    localStorage.setItem("kalorije.korisnik", JSON.stringify({ id: "aleksandra" }));
    // dva jela koja je "napravila" Aleksandra (u pravoj aplikaciji jela pravimo sami)
    localStorage.setItem("kalorije.zajednica", JSON.stringify({ foods: [], dishes: [
      { id: "demo_ovsena", name: "Moja ovsena kaša", items: [["ovsene", 50], ["mleko15", 200], ["posnisir", 100], ["jabuka", 120], ["orah", 10]], createdBy: "aleksandra", createdByName: "Aleksandra" },
      { id: "demo_piletina", name: "Piletina sa pirinčem i brokolijem", items: [["piletinafile", 150], ["integralnipirinac", 60], ["brokoli", 150], ["sargarepa", 80], ["maslinovo", 10]], createdBy: "aleksandra", createdByName: "Aleksandra" }
    ] }));
    var team = {}; team.milos = { name: "Miloš", day: ago(0), pct: 46, streak: 6, last: ago(0), best: 8 };
    localStorage.setItem("kalorije.ekipa", JSON.stringify(team));
    localStorage.setItem(SEED, "1");
  }
  try { if (!localStorage.getItem(SEED)) seed(); } catch (e) {}
  window.resetProba = function () {
    try {
      Object.keys(localStorage).forEach(function (k) { if (k.indexOf("kalorije.") === 0 || k === SEED) localStorage.removeItem(k); });
    } catch (e) {}
    location.reload();
  };
})();
