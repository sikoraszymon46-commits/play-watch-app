// GRA 1 – KLIKANIE
let clicks = 0;
function clickGame() {
  clicks++;
  document.getElementById("game1").innerText =
    "Kliknięcia: " + clicks;
}

// GRA 2 – LOSOWANIE
function randomGame() {
  const number = Math.floor(Math.random() * 10) + 1;
  document.getElementById("game2").innerText =
    "Wylosowano: " + number;
}

// GRA 3 – PUNKTY
let points = 0;
function pointsGame() {
  points += 5;
  document.getElementById("game3").innerText =
    "Punkty: " + points;
}
