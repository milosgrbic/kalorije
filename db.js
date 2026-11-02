/*
 * Sloj podataka za Kalorije.
 *
 * Dva režima:
 *  - LOKALNI (dok firebase-config.js nije popunjen): sve se čuva u ovom browseru.
 *  - OBLAK (Firebase): prijava preko Google naloga,
 *      * zajednička baza namirnica i jela (kolekcije "namirnice" i "jela") — svi vide, svako dodaje,
 *        menja i briše samo ono što je sam napravio (pravila su u firestore.rules),
 *      * lični podaci (profil + obroci po danima) u users/{uid}, vidi ih samo vlasnik.
 *
 * Standardna lista (foods.js, jela.js) nije u bazi i niko je ne može obrisati iz aplikacije.
 */
(function () {
  "use strict";
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var LOCAL_KEY = "kalorije.zajednica";

  var listeners = [];
  var KDB = {
    cloud: !!(window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey),
    ready: false,
    user: null,            // { uid, name, photo } ili null
    foods: [],             // zajedničke namirnice
    dishes: [],            // zajednička jela
    error: "",
    onChange: function (fn) { listeners.push(fn); },
    myId: function () { return KDB.cloud ? (KDB.user && KDB.user.uid) : "local"; },
    canAdd: function () { return !KDB.cloud || !!KDB.user; },
    isMine: function (x) { return !!x && !!x.createdBy && x.createdBy === KDB.myId(); }
  };
  window.KDB = KDB;
  function emit(what) { listeners.forEach(function (fn) { try { fn(what); } catch (e) { console.error(e); } }); }

  // Firestore ne podržava ugnježdene nizove: [["jaje",110]] <-> [{id:"jaje",qty:110}]
  function dishToDb(d) { return d.items.map(function (x) { return { id: x[0], qty: x[1] }; }); }
  function dishFromDb(items) { return (items || []).map(function (x) { return [x.id, x.qty]; }); }
  function clean(o) { var r = {}; Object.keys(o).forEach(function (k) { if (o[k] !== undefined && k !== "id") r[k] = o[k]; }); return r; }

  // ---------------- LOKALNI režim ----------------
  if (!KDB.cloud) {
    var loc = { foods: [], dishes: [] };
    try { var s = JSON.parse(localStorage.getItem(LOCAL_KEY)); if (s) loc = s; } catch (e) {}
    function persist() { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(loc)); } catch (e) {} KDB.foods = loc.foods; KDB.dishes = loc.dishes; emit("community"); }
    function upsert(list, obj, prefix) {
      if (!obj.id) { obj.id = prefix + Date.now().toString(36); obj.createdBy = "local"; obj.createdByName = "Ti"; obj.createdAt = Date.now(); list.push(obj); }
      else { for (var i = 0; i < list.length; i++) if (list[i].id === obj.id) { list[i] = Object.assign({}, list[i], obj); obj = list[i]; } }
      persist();
      return Promise.resolve(obj.id);
    }
    KDB.foods = loc.foods; KDB.dishes = loc.dishes;
    KDB.saveFood = function (f) { return upsert(loc.foods, f, "cf"); };
    KDB.saveDish = function (d) { return upsert(loc.dishes, d, "cd"); };
    KDB.deleteFood = function (id) { loc.foods = loc.foods.filter(function (x) { return x.id !== id; }); persist(); return Promise.resolve(); };
    KDB.deleteDish = function (id) { loc.dishes = loc.dishes.filter(function (x) { return x.id !== id; }); persist(); return Promise.resolve(); };
    KDB.signIn = KDB.signOut = function () { return Promise.resolve(); };
    KDB.loadPersonal = function () { return Promise.resolve(null); };
    KDB.savePersonal = function () {};
    KDB.ready = true;
    setTimeout(function () { emit("auth"); emit("community"); }, 0);
    return;
  }

  // ---------------- OBLAK režim (Firebase) ----------------
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = function () { rej(new Error("Ne mogu da učitam " + src)); };
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
      auth.getRedirectResult().catch(function (e) { KDB.error = poruka(e); emit("auth"); });
      auth.onAuthStateChanged(function (u) {
        unsub.forEach(function (fn) { fn(); }); unsub = [];
        KDB.user = u ? { uid: u.uid, name: u.displayName || (u.email || "").split("@")[0] || "Korisnik", photo: u.photoURL } : null;
        KDB.foods = []; KDB.dishes = [];
        KDB.ready = true;
        emit("auth");
        if (!u) { emit("community"); return; }
        unsub.push(db.collection("namirnice").onSnapshot(function (snap) {
          KDB.foods = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
          emit("community");
        }, function (e) { KDB.error = poruka(e); emit("auth"); }));
        unsub.push(db.collection("jela").onSnapshot(function (snap) {
          KDB.dishes = snap.docs.map(function (d) { var x = d.data(); return Object.assign({ id: d.id }, x, { items: dishFromDb(x.items) }); });
          emit("community");
        }, function (e) { KDB.error = poruka(e); emit("auth"); }));
      });
    })
    .catch(function (e) { KDB.error = poruka(e); KDB.ready = true; emit("auth"); });

  function poruka(e) {
    var c = e && e.code || "";
    if (c === "permission-denied") return "Baza je odbila pristup. Proveri pravila (firestore.rules).";
    if (c === "auth/unauthorized-domain") return "Ovaj sajt nije dozvoljen u Firebase podešavanjima (Authorized domains).";
    if (c === "auth/popup-closed-by-user" || c === "auth/cancelled-popup-request") return "";
    return (e && e.message) || String(e);
  }

  KDB.signIn = function () {
    var p = new firebase.auth.GoogleAuthProvider();
    KDB.error = "";
    return auth.signInWithPopup(p).catch(function (e) {
      if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) return auth.signInWithRedirect(p);
      KDB.error = poruka(e); emit("auth");
    });
  };
  KDB.signOut = function () { return auth.signOut(); };

  function meta() {
    return { createdBy: KDB.user.uid, createdByName: KDB.user.name };
  }
  function save(coll, obj) {
    if (!KDB.user) return Promise.reject(new Error("Prijavi se da bi dodavao."));
    var data = clean(obj);
    if (obj.id) {
      data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      Object.assign(data, meta());
      return db.collection(coll).doc(obj.id).set(data, { merge: true }).then(function () { return obj.id; });
    }
    Object.assign(data, meta(), { createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    return db.collection(coll).add(data).then(function (ref) { return ref.id; });
  }
  KDB.saveFood = function (f) { return save("namirnice", f); };
  KDB.saveDish = function (d) { var x = Object.assign({}, d, { items: dishToDb(d) }); return save("jela", x); };
  KDB.deleteFood = function (id) { return db.collection("namirnice").doc(id).delete(); };
  KDB.deleteDish = function (id) { return db.collection("jela").doc(id).delete(); };

  // Lični podaci: users/{uid} = profil i "nedavno", users/{uid}/dani/{YYYY-MM-DD} = obroci tog dana
  KDB.loadPersonal = function () {
    if (!KDB.user) return Promise.resolve(null);
    var ref = db.collection("users").doc(KDB.user.uid);
    return Promise.all([ref.get(), ref.collection("dani").get()]).then(function (r) {
      if (!r[0].exists) return null;
      var m = r[0].data(), days = {};
      r[1].forEach(function (d) { days[d.id] = d.data().meals || {}; });
      return { profile: m.profile || null, recent: m.recent || [], recentDishes: m.recentDishes || [], days: days };
    });
  };
  var pending = {}, timer = null;
  KDB.savePersonal = function (state, dayKeys) {
    if (!KDB.user) return;
    pending.meta = { profile: state.profile || null, recent: state.recent || [], recentDishes: state.recentDishes || [] };
    (dayKeys || []).forEach(function (k) { pending[k] = state.days[k] || {}; });
    clearTimeout(timer);
    timer = setTimeout(flush, 600);
  };
  function flush() {
    if (!KDB.user) return;
    var ref = db.collection("users").doc(KDB.user.uid), batch = db.batch(), p = pending;
    pending = {};
    Object.keys(p).forEach(function (k) {
      if (k === "meta") batch.set(ref, Object.assign({ name: KDB.user.name, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, p.meta));
      else batch.set(ref.collection("dani").doc(k), { meals: p[k] });
    });
    batch.commit().catch(function (e) { KDB.error = poruka(e); emit("auth"); });
  }
  window.addEventListener("pagehide", flush);
})();
