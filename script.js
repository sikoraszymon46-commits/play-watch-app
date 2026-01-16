let player = null;

// START
window.onload = () => {
  const saved = localStorage.getItem("player");
  if (saved) {
    player = JSON.parse(saved);
    showApp();
  }
};

// START GAME
function startGame() {
  const nick = document.getElementById("nicknameInput").value.trim();

  if (nick.length < 3) {
    alert("Nick musi mieć min. 3 znaki");
    return;
  }

  player = {
    nick: nick,
    points: 0,
    rebirth: 0,
    multiplier: 1,
    lifetimePoints: 0
  };

  savePlayer();
  showApp();
}

// POKAŻ STRONĘ
function showApp() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("mainApp").style.display = "block";

  document.getElementById("playerNick").textContent = player.nick;
  updateUI();
}

// DODAWANIE PUNKTÓW
function addPoints(base) {
  const gained = base * player.multiplier;
  player.points += gained;
  player.lifetimePoints += gained;
  savePlayer();
  updateUI();
}

// UI
function updateUI() {
  document.getElementById("totalPoints").textContent = player.points;
  document.getElementById("rebirth").textContent = player.rebirth;
  document.getElementById("multiplier").textContent = player.multiplier;
}

// SAVE
function savePlayer() {
  localStorage.setItem("player", JSON.stringify(player));
}
