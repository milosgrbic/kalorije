/*
 * Firebase podešavanja. Dok je ovde null, aplikacija radi u LOKALNOM režimu
 * (sve se čuva samo u browseru, nema zajedničke baze).
 *
 * Kad napraviš Firebase projekat (uputstvo u FIREBASE.md), zameni null objektom
 * iz Firebase konzole, npr:
 *
 * window.FIREBASE_CONFIG = {
 *   apiKey: "AIza...",
 *   authDomain: "kalorije-xxxx.firebaseapp.com",
 *   projectId: "kalorije-xxxx",
 *   storageBucket: "kalorije-xxxx.appspot.com",
 *   messagingSenderId: "1234567890",
 *   appId: "1:1234567890:web:abc123"
 * };
 *
 * Ovi podaci nisu tajni, smeju da budu javni na GitHub-u.
 * Bazu štite pravila iz firestore.rules.
 */
window.FIREBASE_CONFIG = null;
