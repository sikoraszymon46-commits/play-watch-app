
// Punkty globalne
let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
document.getElementById("totalPoints").innerText = points;
function addPoints(x){
  points+=x;
  localStorage.setItem("points", points);
  document.getElementById("totalPoints").innerText = points;
}

// Zagadki
const zagadki = [
  {q:"Co zawsze rośnie, ale nigdy nie spada?", a:"wiek"},
  {q:"Co ma klucze, ale nie otwiera drzwi?", a:"pianino"},
  {q:"Co można złamać, ale nie dotknąć?", a:"obietnica"},
  {q:"Co jest Twoje, ale inni używają tego częściej?", a:"imię"},
  {q:"Im więcej zabierasz, tym większe się staje.", a:"dziura"}
];
let aktualnaZagadka = {};
function losujZagadke(){
  const i = Math.floor(Math.random()*zagadki.length);
  aktualnaZagadka = zagadki[i];
  document.getElementById("riddleText").innerText = aktualnaZagadka.q;
  document.getElementById("riddleResult").innerText = "";
  document.getElementById("riddleAnswer").value = "";
}
function sprawdzZagadke(){
  const odp = document.getElementById("riddleAnswer").value.toLowerCase().trim();
  if(odp===aktualnaZagadka.a.toLowerCase()){
    document.getElementById("riddleResult").innerText="✅ Poprawna!";
    addPoints(2);
    losujZagadke();
  } else {
    document.getElementById("riddleResult").innerText="❌ Spróbuj ponownie!";
  }
}

// Klikacz
let clicks=0;
function klik(){ clicks++; document.getElementById("clicks").innerText=clicks; addPoints(1); }

// Losowa liczba
function losuj(){ const number=Math.floor(Math.random()*100)+1; document.getElementById("number").innerText=number; addPoints(1); }

// Szybkie kliknięcia
let fastClicks=0;
const fastClickBtn=document.getElementById("fastClickBtn");
fastClickBtn.addEventListener("click",()=>{
  fastClicks++;
  document.getElementById("fastClicks").innerText=fastClicks;
  addPoints(1);
  if(fastClicks>=5){
    alert("Brawo! Zdobyłeś punkty!");
    fastClicks=0;
    document.getElementById("fastClicks").innerText=0;
  }
});

// Losowa karta
function losujKarte(){
  const kolory=["Kier","Karo","Trefl","Pik"];
  const liczby=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  const karta=liczby[Math.floor(Math.random()*liczby.length)]+" "+kolory[Math.floor(Math.random()*kolory.length)];
  document.getElementById("card").innerText=karta;
  addPoints(1);
}

// Odgadnij liczbę
function sprawdzLiczbe(){
  const los=Math.floor(Math.random()*10)+1;
  const input=parseInt(document.getElementById("guessNumber").value);
  const result=document.getElementById("guessResult");
  if(input===los){
    result.innerText="Gratulacje! Trafiłeś!";
    addPoints(3);
  } else {
    result.innerText="Spróbuj ponownie! Wylosowana liczba to "+los;
  }
}
