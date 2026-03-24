const celebrities = [
  {
    name: "Barack Obama",
    ear: "images/obama-ear.jpg",
    full: "images/obama.jpg"
  },
  {
    name: "Taylor Swift",
    ear: "images/taylor-ear.jpg",
    full: "images/taylor.jpg"
  },
  {
    name: "Cristiano Ronaldo",
    ear: "images/ronaldo-ear.jpg",
    full: "images/ronaldo.jpg"
  },
  {
    name: "Adele",
    ear: "images/adele-ear.jpg",
    full: "images/adele.jpg"
  }
];

let currentIndex = 0;

const earImage = document.getElementById("earImage");
const guessInput = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");
const revealSection = document.getElementById("revealSection");
const fullImage = document.getElementById("fullImage");
const answerText = document.getElementById("answerText");

const submitBtn = document.getElementById("submitBtn");
const revealBtn = document.getElementById("revealBtn");
const nextBtn = document.getElementById("nextBtn");

function normalise(text) {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function loadQuestion() {
  const celeb = celebrities[currentIndex];

  earImage.src = celeb.ear;
  earImage.alt = `${celeb.name} ear`;

  guessInput.value = "";
  feedback.textContent = "";
  revealSection.classList.add("hidden");
  fullImage.src = "";
  answerText.textContent = "";
}

function submitGuess() {
  const guess = normalise(guessInput.value);
  const answer = normalise(celebrities[currentIndex].name);

  if (!guess) {
    feedback.textContent = "Type a guess first.";
    return;
  }

  if (guess === answer) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Not quite. Hit Reveal to see who it is.";
  }
}

function revealAnswer() {
  const celeb = celebrities[currentIndex];
  fullImage.src = celeb.full;
  fullImage.alt = celeb.name;
  answerText.textContent = celeb.name;
  revealSection.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= celebrities.length) {
    currentIndex = 0;
  }
  loadQuestion();
}

submitBtn.addEventListener("click", submitGuess);
revealBtn.addEventListener("click", revealAnswer);
nextBtn.addEventListener("click", nextQuestion);

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitGuess();
  }
});

loadQuestion();
