const celebrities = [
  {
    name: "Barack Obama",
    ear: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Barack_Obama_ear_crop.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
  },
  {
    name: "Elon Musk",
    ear: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Elon_Musk_ear_crop.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg"
  },
  {
    name: "Taylor Swift",
    ear: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Taylor_Swift_ear_crop.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Taylor_Swift_Red_Tour.jpg"
  },
  {
    name: "Cristiano Ronaldo",
    ear: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Ronaldo_ear_crop.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg"
  }
];

let currentIndex = 0;

function loadQuestion() {
  const celeb = celebrities[currentIndex];

  document.getElementById("earImage").src = celeb.ear;
  document.getElementById("guessInput").value = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("revealSection").classList.add("hidden");
}

function submitGuess() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  const answer = celebrities[currentIndex].name.toLowerCase();

  if (guess === answer) {
    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    document.getElementById("feedback").textContent = "❌ Not quite...";
  }
}

function revealAnswer() {
  const celeb = celebrities[currentIndex];

  document.getElementById("fullImage").src = celeb.full;
  document.getElementById("answerText").textContent = celeb.name;
  document.getElementById("revealSection").classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= celebrities.length) {
    currentIndex = 0;
  }
  loadQuestion();
}

// Start game
loadQuestion();
