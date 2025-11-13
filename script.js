const animals = [
  {name:"kucing", image:"k.jpg", clue:"Hewan berbulu lembut yang suka mengeong."},
  {name:"anjing", image:"A.jpg", clue:"Hewan setia yang suka menggonggong."},
  {name:"gajah", image:"G.jpg", clue:"Hewan besar dengan belalai panjang."},
  {name:"harimau", image:"H.jpg", clue:"Hewan bergaris oranye hitam dan buas."},
  {name:"singa", image:"s.avif", clue:"Raja hutan dengan surai megah."},
  {name:"kelinci", image:"K.webp", clue:"Hewan kecil dengan telinga panjang yang suka wortel."},
  {name:"jerapah", image:"J.jpg", clue:"Hewan tinggi dengan leher panjang."},
  {name:"zebra", image:"Z.jpg", clue:"Hewan belang hitam putih mirip kuda."},
  {name:"kuda", image:"D.webp", clue:"Hewan kuat yang biasa ditunggangi."},
  {name:"panda", image:"P.jpg", clue:"Hewan gemuk hitam putih yang suka bambu."},
  {name:"buaya", image:"B.jpg", clue:"Hewan amfibi bergigi tajam dan kulit keras."},
  {name:"tikus", image:"T.png", clue:"Hewan kecil yang suka keju dan lari cepat."},
  {name:"unta", image:"unta.avif", clue:"Hewan berpunuk yang kuat di padang pasir."},
  {name:"monyet", image:"J.jpg", clue:"Hewan cerdas yang suka memanjat dan makan pisang."}
];

let currentLevel = 0;
let coins = 10;
let timer;
let timeLeft = 30;

function mulaiGame() {
  document.getElementById('menuContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  loadLevel();
}

function loadLevel() {
  if (currentLevel >= animals.length) {
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('gameCompleted').style.display = 'block';
    return;
  }

  const animal = animals[currentLevel];
  const animalImg = document.getElementById('animalImage');
  animalImg.src = animal.image;
  animalImg.classList.remove("revealed");

  document.getElementById('guessInput').value = "";
  document.getElementById('result').innerText = "";
  document.getElementById('clueContainer').style.display = "none";

  updateLevelDisplay();

  timeLeft = 30;
  updateTimer();
  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById('result').innerText = "⏰ Waktu habis!";
    nextLevel();
  }
}

function updateTimer() {
  document.getElementById('timer').innerText = "⏳ Waktu: " + timeLeft + " detik";
}

function updateLevelDisplay() {
  const container = document.getElementById('levelContainer');
  container.innerHTML = "";
  for (let i = 0; i < animals.length; i++) {
    const circle = document.createElement("div");
    circle.classList.add("level-circle");
    if (i === currentLevel) circle.classList.add("active");
    circle.innerText = i + 1;
    container.appendChild(circle);
  }
}

document.getElementById('guessButton').addEventListener('click', function() {
  const guess = document.getElementById('guessInput').value.trim().toLowerCase();
  const animal = animals[currentLevel];
  const correct = animal.name.toLowerCase();

  if (guess === correct) {
    document.getElementById('result').innerText = "🎉 Benar! Itu " + correct.toUpperCase();
    coins += 5;
    document.getElementById('coins').innerText = coins;

    document.getElementById('animalImage').classList.add("revealed");

    clearInterval(timer);
    setTimeout(nextLevel, 1500);
  } else {
    document.getElementById('result').innerText = "❌ Salah, coba lagi!";
    coins -= 1;
    document.getElementById('coins').innerText = coins;
  }
});

document.getElementById('resetButton').addEventListener('click', function() {
  coins -= 2;
  document.getElementById('coins').innerText = coins;
  nextLevel();
});

document.getElementById('clueButton').addEventListener('click', function() {
  const animal = animals[currentLevel];
  const clueBox = document.getElementById('clueContainer');
  clueBox.innerText = "💡 Petunjuk: " + animal.clue;
  clueBox.style.display = "block";
  coins -= 2;
  document.getElementById('coins').innerText = coins;
});

function nextLevel() {
  currentLevel++;
  loadLevel();
}

function ulangGame() {
  currentLevel = 0;
  coins = 10;
  document.getElementById('coins').innerText = coins;
  document.getElementById('gameCompleted').style.display = 'none';
  document.getElementById('menuContainer').style.display = 'block';
}
