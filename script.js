// ============================================
// PLAYWATCH – SCRIPT.JS
// ============================================

// Globalne zmienne
let totalPoints = 0;
let clicks = 0;
let riddleIndex = 0;
let rebirthCount = 0;
let playerNick = "";
let pointMultiplier = 1;

// =====================
// FIREBASE
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyAp6tsQqV-jiscPzqlRS6cjsRHveR-5sGU",
  authDomain: "playwatchranking.firebaseapp.com",
  projectId: "playwatchranking",
  storageBucket: "playwatchranking.firebasestorage.app",
  messagingSenderId: "749619304668",
  appId: "1:749619304668:web:9be4afbf186b2b560fbc19",
  measurementId: "G-BN6QCD11C9"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =====================
// START GRY
// =====================
function startGame() {
  const nickInput = document.getElementById("playerNick").value.trim();
  if (nickInput === "") { alert("Podaj swój nick!"); return; }

  playerNick = nickInput;

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";

  updatePoints();
  losujZagadke();
  loadRanking();
}

// =====================
// Punkty i Rebirth
// =====================
function updatePoints() {
  document.getElementById("totalPoints").innerText = totalPoints;
  document.getElementById("rebirthCount").innerText = rebirthCount;
}

function rebirth() {
  if (totalPoints >= 100000000) {
    rebirthCount++;
    totalPoints = 0;
    pointMultiplier = 1 + rebirthCount * 0.5; // ×1.5 ×2 ×2.5 ...
    updatePoints();
    alert("Rebirth ukończony! Punkty mnożone ×" + pointMultiplier.toFixed(1));
  } else {
    alert("Nie masz wystarczająco punktów na Rebirth!");
  }
}

// =====================
// Gra – Klikacz
// =====================
function klik() {
  clicks++;
  totalPoints += 5 * pointMultiplier;
  document.getElementById("clicks").innerText = clicks;
  updatePoints();
  saveScore();
}

// =====================
// Gra – Zagadki
// =====================
const zagadki = [
  { q: "Co zawsze rośnie, ale nigdy nie spada?", a: "wiek" },
  { q: "Co ma klucze, ale nie otwiera drzwi?", a: "fortepian" },
  { q: "Co można złamać, ale nie można dotknąć?", a: "obietnica" },
  { q: "Co ma wiele twarzy, ale nie ma oczu?", a: "zegarek" },
  { q: "Co jest Twoje, a inni używają częściej niż Ty?", a: "imię" }
];

function losujZagadke() {
  riddleIndex = Math.floor(Math.random() * zagadki.length);
  document.getElementById("riddleText").innerText = zagadki[riddleIndex].q;
  document.getElementById("riddleAnswer").value = "";
  document.getElementById("riddleResult").innerText = "";
}

function sprawdzZagadke() {
  const answer = document.getElementById("riddleAnswer").value.toLowerCase().trim();
  if (answer === zagadki[riddleIndex].a) {
    document.getElementById("riddleResult").innerText = "✅ Poprawnie!";
    totalPoints += 10 * pointMultiplier;
    updatePoints();
    saveScore();
  } else {
    document.getElementById("riddleResult").innerText = "❌ Błąd!";
  }
}

// =====================
// Bonus za reklamy
// =====================
function bonusAdWatched() {
  const bonusPoints = 100;
  totalPoints += bonusPoints * pointMultiplier;
  updatePoints();
  saveScore();
  alert("Bonus za reklamę: +" + (bonusPoints * pointMultiplier) + " pkt!");
}

// =====================
// Ranking TOP 100
// =====================
function saveScore() {
  if (!playerNick) return;
  db.collection("ranking").doc(playerNick).set({ points: totalPoints })
    .then(() => loadRanking());
}

function loadRanking() {
  db.collection("ranking").orderBy("points", "desc").limit(100).get()
    .then(snapshot => {
      const rankingList = document.getElementById("ranking");
      rankingList.innerHTML = "";
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = `${doc.id}: ${doc.data().points} pkt`;
        rankingList.appendChild(li);
      });
    });
}
