/*
 * Sloj podataka za Kalorije.
 *
 * Prijava: korisničko ime (username) iz korisnici.js, bez šifre.
 *
 * Dva režima:
 *  - LOKALNI (dok firebase-config.js nije popunjen): sve se čuva u ovom browseru,
 *    odvojeno za svakog korisnika.
 *  - OBLAK (Firebase): svaki korisnik ima nalog <id>@kalorije.app sa lozinkom
 *    izvedenom iz username-a (pravi ga Claude ili admin, vidi FIREBASE.md).
 *      * zajednička baza namirnica i jela (kolekcije "namirnice" i "jela"): svi vide, svako dodaje,
 *        menja i briše samo ono što je sam napravio (pravila su u firestore.rules),
 *      * lični podaci u users/{uid}: profil, niz dana, težina; obroci po danima u users/{uid}/dani
 *        (čuva se poslednjih 15 dana) — vidi ih samo vlasnik,
 *      * ekipa/{uid}: mali javni sažetak za ekran Ekipa (ime, % današnjeg cilja, niz dana, dani bez cigare).
 *
 * Standardna lista namirnica (foods.js) nije u bazi i niko je ne može obrisati iz aplikacije.
 * Jela postoje samo ona koja napravimo mi (kolekcija "jela").
 */
(function () {
  "use strict";
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var SESSION_KEY = "kalorije.korisnik";
  var LOCAL_KEY = "kalorije.zajednica";
  var DOMAIN = "@kalorije.app";
  var USERS = window.KORISNICI || [];

  var listeners = [];
  var KDB = {
    cloud: !!(window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey),
    ready: false,
    user: null,            // { uid, id, name } ili null
    foods: [],             // zajedničke namirnice
    dishes: [],            // zajednička jela
    error: "",
    onChange: function (fn) { listeners.push(fn); },
    myId: function () { return KDB.user ? KDB.user.uid : null; },
    canAdd: function () { return !!KDB.user; },
    isMine: function (x) { return !!x && !!KDB.user && x.createdBy === KDB.user.uid; }
  };
  window.KDB = KDB;
  function emit(what) { listeners.forEach(function (fn) { try { fn(what); } catch (e) { console.error(e); } }); }
  function byId(id) { for (var i = 0; i < USERS.length; i++) if (USERS[i].id === id) return USERS[i]; return null; }
  function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch (e) { return null; } }
  function setSession(s) { try { if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s)); else localStorage.removeItem(SESSION_KEY); } catch (e) {} }

  function sha256(text) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error("Ovaj browser ne podržava prijavu. Otvori sajt preko https adrese."));
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    });
  }
  // Pronađi korisnika po ukucanom username-u
  function findUser(username) {
    var u = String(username || "").trim().toLowerCase();
    if (!u) return Promise.reject(new Error("Upiši korisničko ime."));
    return sha256("kalorije:" + u).then(function (h) {
      for (var i = 0; i < USERS.length; i++) if (USERS[i].hash === h) return { entry: USERS[i], username: u };
      throw new Error("Ne postoji korisnik sa tim imenom. Proveri slova i brojeve.");
    });
  }

  // Firestore ne podržava ugnježdene nizove: [["jaje",110]] <-> [{id:"jaje",qty:110}]
  function dishToDb(d) { return d.items.map(function (x) { return { id: x[0], qty: x[1] }; }); }

  // Podatke koje su uneli drugi korisnici pre prikaza svodimo na poznata polja i tipove,
  // da niko ne može da ubaci HTML ili čudne vrednosti u tuđu aplikaciju.
  function str(v, max) { return String(v == null ? "" : v).slice(0, max || 120); }
  function nr(v) { var n = Number(v); return isFinite(n) && n >= 0 ? n : 0; }
  function cleanFood(id, x) {
    return { id: id, name: str(x.name) || "Bez naziva", cat: str(x.cat, 60) || "Ostalo", unit: x.unit === "ml" ? "ml" : "g",
      kcal: nr(x.kcal), p: nr(x.p), f: nr(x.f), c: nr(x.c), portion: nr(x.portion) || 100,
      createdBy: str(x.createdBy, 128), createdByName: str(x.createdByName, 40) };
  }
  function cleanDish(id, x) {
    var items = Array.isArray(x.items) ? x.items : [];
    return { id: id, name: str(x.name) || "Bez naziva", createdBy: str(x.createdBy, 128), createdByName: str(x.createdByName, 40),
      items: items.slice(0, 60).map(function (i) { return Array.isArray(i) ? [str(i[0], 128), nr(i[1])] : [str(i && i.id, 128), nr(i && i.qty)]; }) };
  }
  function clean(o) { var r = {}; Object.keys(o).forEach(function (k) { if (o[k] !== undefined && k !== "id") r[k] = o[k]; }); return r; }

  // ---------------- LOKALNI režim ----------------
  if (!KDB.cloud) {
    var loc = { foods: [], dishes: [] };
    try { var s = JSON.parse(localStorage.getItem(LOCAL_KEY)); if (s) loc = s; } catch (e) {}
    var persist = function () { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(loc)); } catch (e) {} KDB.foods = loc.foods; KDB.dishes = loc.dishes; emit("community"); };
    var upsert = function (list, obj, prefix) {
      if (!obj.id) {
        obj.id = prefix + Date.now().toString(36);
        obj.createdBy = KDB.user.uid; obj.createdByName = KDB.user.name; obj.createdAt = Date.now();
        list.push(obj);
      } else {
        for (var i = 0; i < list.length; i++) if (list[i].id === obj.id) { list[i] = Object.assign({}, list[i], obj); obj = list[i]; }
      }
      persist();
      return Promise.resolve(obj.id);
    };
    KDB.foods = loc.foods; KDB.dishes = loc.dishes;   // lokalno: samo ovaj uređaj, ne treba čišćenje
    KDB.saveFood = function (f) { return upsert(loc.foods, f, "cf"); };
    KDB.saveDish = function (d) { return upsert(loc.dishes, d, "cd"); };
    KDB.deleteFood = function (id) { loc.foods = loc.foods.filter(function (x) { return x.id !== id; }); persist(); return Promise.resolve(); };
    KDB.deleteDish = function (id) { loc.dishes = loc.dishes.filter(function (x) { return x.id !== id; }); persist(); return Promise.resolve(); };
    KDB.login = function (username) {
      return findUser(username).then(function (r) {
        KDB.user = { uid: r.entry.id, id: r.entry.id, name: r.entry.name };
        setSession({ id: r.entry.id });
        KDB.error = ""; emit("auth");
      });
    };
    KDB.logout = function () { KDB.user = null; setSession(null); emit("auth"); return Promise.resolve(); };
    KDB.loadPersonal = function () { return Promise.resolve(null); };
    KDB.deleteDays = function () {};
    var TEAM_KEY = "kalorije.ekipa", teamCbs = [];
    var readTeam = function () { try { return JSON.parse(localStorage.getItem(TEAM_KEY)) || {}; } catch (e) { return {}; } };
    KDB.savePersonal = function (state, dayKeys, team) {
      if (!team || !KDB.user) return;
      var t = readTeam(); t[KDB.user.uid] = team;
      try { localStorage.setItem(TEAM_KEY, JSON.stringify(t)); } catch (e) {}
      teamCbs.forEach(function (cb) { cb(teamList(t)); });
    };
    var teamList = function (t) { return Object.keys(t).map(function (k) { return Object.assign({ uid: k }, t[k]); }); };
    KDB.watchTeam = function (cb) {
      teamCbs.push(cb); cb(teamList(readTeam()));
      return function () { teamCbs = teamCbs.filter(function (x) { return x !== cb; }); };
    };
    var ss = getSession(), e0 = ss && byId(ss.id);
    if (e0) KDB.user = { uid: e0.id, id: e0.id, name: e0.name };
    KDB.ready = true;
    setTimeout(function () { emit("auth"); emit("community"); }, 0);
    return;
  }

  // ---------------- OBLAK režim (Firebase) ----------------
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = function () { rej(new Error("Nema interneta ili ne mogu da učitam bazu.")); };
      document.head.appendChild(s);
    });
  }
  var auth, db, unsub = [];

  loadScript(SDK + "firebase-app-compat.js")
    .then(function () { return Promise.all([loadScript(SDK + "firebase-auth-compat.js"), loadScript(SDK + "firebase-firestore-compat.js")]); })
    .then(function () {
      firebase.initializeApp(window.FIREBASE_CONFIG);
      auth = firebase.auth();
      db = firebase.firestore();
      try { db.enablePersistence({ synchronizeTabs: true }).catch(function () {}); } catch (e) {}
      auth.onAuthStateChanged(function (u) {
        unsub.forEach(function (fn) { fn(); }); unsub = [];
        var entry = u && byId(String(u.email || "").split("@")[0]);
        KDB.user = u ? { uid: u.uid, id: entry ? entry.id : "", name: entry ? entry.name : "Korisnik" } : null;
        KDB.foods = []; KDB.dishes = [];
        KDB.ready = true;
        emit("auth");
        if (!u) { emit("community"); return; }
        unsub.push(db.collection("namirnice").onSnapshot(function (snap) {
          KDB.foods = snap.docs.map(function (d) { return cleanFood(d.id, d.data()); });
          okAgain(); emit("community");
        }, function (e) { KDB.error = poruka(e); emit("auth"); }));
        unsub.push(db.collection("jela").onSnapshot(function (snap) {
          KDB.dishes = snap.docs.map(function (d) { return cleanDish(d.id, d.data()); });
          okAgain(); emit("community");
        }, function (e) { KDB.error = poruka(e); emit("auth"); }));
      });
    })
    .catch(function (e) { KDB.error = poruka(e); KDB.ready = true; emit("auth"); });

  // ranija greška (npr. bez interneta) se briše čim baza ponovo odgovori
  function okAgain() { if (KDB.error) { KDB.error = ""; emit("auth"); } }
  function poruka(e) {
    var c = e && e.code || "";
    if (c === "permission-denied") return "Baza je odbila pristup. Proveri pravila (firestore.rules).";
    if (c === "auth/invalid-credential" || c === "auth/user-not-found" || c === "auth/wrong-password" || c === "auth/invalid-login-credentials")
      return "Korisničko ime je tačno, ali nalog još nije napravljen u bazi. Javi Milošu.";
    if (c === "auth/network-request-failed") return "Nema interneta. Pokušaj ponovo.";
    if (c === "auth/too-many-requests") return "Previše pokušaja. Sačekaj par minuta.";
    return (e && e.message) || String(e);
  }

  KDB.login = function (username) {
    if (!auth) return Promise.reject(new Error(KDB.error || "Baza se još učitava, pokušaj za trenutak."));
    return findUser(username).then(function (r) {
      return auth.signInWithEmailAndPassword(r.entry.id + DOMAIN, "kalorije-" + r.username);
    }).then(function () { KDB.error = ""; }, function (e) { throw new Error(poruka(e)); });
  };
  KDB.logout = function () { flush(); return auth ? auth.signOut() : Promise.resolve(); };

  function save(coll, obj) {
    if (!KDB.user) return Promise.reject(new Error("Prijavi se da bi dodavao."));
    var data = clean(obj), who = { createdBy: KDB.user.uid, createdByName: KDB.user.name };
    if (obj.id) {
      Object.assign(data, who, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
      return db.collection(coll).doc(obj.id).set(data, { merge: true }).then(function () { return obj.id; });
    }
    Object.assign(data, who, { createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    return db.collection(coll).add(data).then(function (ref) { return ref.id; });
  }
  function wrap(p) { return p.catch(function (e) { throw new Error(poruka(e)); }); }
  KDB.saveFood = function (f) { return wrap(save("namirnice", f)); };
  KDB.saveDish = function (d) { return wrap(save("jela", Object.assign({}, d, { items: dishToDb(d) }))); };
  KDB.deleteFood = function (id) { return wrap(db.collection("namirnice").doc(id).delete()); };
  KDB.deleteDish = function (id) { return wrap(db.collection("jela").doc(id).delete()); };

  // Lični podaci: users/{uid} = profil, nedavno, niz dana, težina; users/{uid}/dani/{YYYY-MM-DD} = obroci tog dana
  KDB.loadPersonal = function () {
    if (!KDB.user) return Promise.resolve(null);
    var ref = db.collection("users").doc(KDB.user.uid);
    return Promise.all([ref.get(), ref.collection("dani").get()]).then(function (r) {
      if (!r[0].exists) return null;
      var m = r[0].data(), days = {};
      r[1].forEach(function (d) { days[d.id] = d.data().meals || {}; });
      return { profile: m.profile || null, recent: m.recent || [], recentDishes: m.recentDishes || [],
        streak: m.streak || null, best: m.best || 0, weights: m.weights || null, smoke: m.smoke || null, days: days };
    });
  };
  // stari dani (van 15 dana) se brišu iz baze
  KDB.deleteDays = function (keys) {
    if (!KDB.user || !keys.length) return;
    var ref = db.collection("users").doc(KDB.user.uid).collection("dani"), batch = db.batch();
    keys.forEach(function (k) { batch.delete(ref.doc(k)); });
    batch.commit().catch(function () {});
  };
  var pending = {}, pendingTeam = null, timer = null;
  KDB.savePersonal = function (state, dayKeys, team) {
    if (!KDB.user) return;
    pending.meta = { profile: state.profile || null, recent: state.recent || [], recentDishes: state.recentDishes || [],
      streak: state.streak || null, best: state.best || 0, weights: state.weights || null, smoke: state.smoke || null };
    (dayKeys || []).forEach(function (k) { pending[k] = state.days[k] || {}; });
    if (team) pendingTeam = team;
    clearTimeout(timer);
    timer = setTimeout(flush, 600);
  };
  function flush() {
    if (!KDB.user) return;
    var ref = db.collection("users").doc(KDB.user.uid), p = pending, team = pendingTeam;
    pending = {}; pendingTeam = null;
    if (Object.keys(p).length) {
      var batch = db.batch();
      Object.keys(p).forEach(function (k) {
        if (k === "meta") batch.set(ref, Object.assign({ name: KDB.user.name, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, p.meta));
        else batch.set(ref.collection("dani").doc(k), { meals: p[k] });
      });
      batch.commit().catch(function (e) { KDB.error = poruka(e); emit("auth"); });
    }
    // ekipa ide posebno, da njena greška ne bi sprečila čuvanje obroka
    if (team) db.collection("ekipa").doc(KDB.user.uid).set(Object.assign({}, team, { updatedAt: firebase.firestore.FieldValue.serverTimestamp() }))
      .then(function () { KDB.teamError = ""; }, function (e) { KDB.teamError = poruka(e); emit("team"); });
  }
  KDB.teamError = "";
  KDB.watchTeam = function (cb) {
    if (!KDB.user) { cb([]); return function () {}; }
    return db.collection("ekipa").onSnapshot(function (snap) {
      cb(snap.docs.map(function (d) {
        var x = d.data();
        return { uid: d.id, name: str(x.name, 40) || "Korisnik", day: str(x.day, 10), pct: nr(x.pct), streak: nr(x.streak), last: str(x.last, 10), best: nr(x.best), smoke: x.smoke == null ? -1 : nr(x.smoke) };
      }));
    }, function (e) { KDB.teamError = poruka(e); cb(null); });
  };
  window.addEventListener("pagehide", flush);
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flush(); });
})();
