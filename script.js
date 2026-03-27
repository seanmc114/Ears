const cards = [
  {
    name: "Cristiano Ronaldo",
    ear: "assets/ronaldo-ear.png",
    full: "assets/ronaldo-reveal.png",
    hint: "Footballer. Portugal. Famous goal celebration.",
    aliases: ["cristiano ronaldo","ronaldo","cr7","cristiano"]
  },
  {
    name: "Lionel Messi",
    ear: "assets/messi-ear.png",
    full: "assets/messi-reveal.png",
    hint: "Footballer. Argentina. Left-footed legend.",
    aliases: ["lionel messi","messi","leo messi"]
  },
  {
    name: "Taylor Swift",
    ear: "assets/taylor-ear.png",
    full: "assets/taylor-reveal.png",
    hint: "Singer-songwriter. Eras Tour.",
    aliases: ["taylor swift","taylor","swift"]
  },
  {
    name: "Harry Styles",
    ear: "assets/harry-ear.png",
    full: "assets/harry-reveal.png",
    hint: "Pop star. Former boyband. Big fashion energy.",
    aliases: ["harry styles","harry"]
  },
  {
    name: "Rihanna",
    ear: "assets/rihanna-ear.png",
    full: "assets/rihanna-reveal.png",
    hint: "Singer and mogul. Umbrella.",
    aliases: ["rihanna","riri","ri ri"]
  },
  {
    name: "Barack Obama",
    ear: "assets/obama-ear.png",
    full: "assets/obama-reveal.png",
    hint: "44th US president.",
    aliases: ["barack obama","obama","barack"]
  }
];

let deck = shuffle([...cards]);
let index = 0;
let tadghMode = false;

const earImage = document.getElementById("earImage");
const fullImage = document.getElementById("fullImage");
const answer = document.getElementById("answer");
const revealBox = document.getElementById("revealBox");
const feedback = document.getElementById("feedback");
const guessInput = document.getElementById("guessInput");
const tadghBtn = document.getElementById("tadghBtn");

document.getElementById("submitBtn").addEventListener("click", submitGuess);
document.getElementById("hintBtn").addEventListener("click", showHint);
document.getElementById("revealBtn").addEventListener("click", revealCard);
document.getElementById("nextBtn").addEventListener("click", nextCard);
tadghBtn.addEventListener("click", toggleTadghMode);
guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitGuess();
});

function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function normalize(text){
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function current(){
  return deck[index];
}

function loadCard(){
  const card = current();
  earImage.src = card.ear;
  earImage.alt = card.name + " ear clue";
  guessInput.value = "";
  revealBox.classList.add("hidden");
  fullImage.src = "";
  answer.textContent = "";
  feedback.innerHTML = tadghMode
    ? "Tadgh Mode engaged. Pure notions. Massive confidence. Variable accuracy."
    : "Fresh deck. Fresh ears. Go on.";
}

function submitGuess(){
  const guessRaw = guessInput.value.trim();
  const guess = normalize(guessRaw);

  if(!guess){
    feedback.textContent = tadghMode
      ? "At least lash in a name, Tadgh."
      : "Type a name first.";
    return;
  }

  const ok = current().aliases.some(a => normalize(a) === guess);

  if(ok){
    feedback.innerHTML = tadghMode
      ? "✅ Stop. He actually got <strong>" + current().name + "</strong>. Tadgh is unbearable now."
      : "✅ Correct. <strong>" + current().name + "</strong>.";
    revealCard();
  } else {
    feedback.textContent = tadghMode
      ? "❌ Not " + guessRaw + ". Bold. Completely wrong, but bold."
      : "❌ Not " + guessRaw + ". Hit Hint or Reveal.";
  }
}

function showHint(){
  feedback.textContent = (tadghMode ? "Tadgh Hint: " : "Hint: ") + current().hint;
}

function revealCard(){
  fullImage.src = current().full;
  answer.textContent = current().name;
  revealBox.classList.remove("hidden");
}

function nextCard(){
  index++;
  if(index >= deck.length){
    deck = shuffle([...cards]);
    index = 0;
  }
  loadCard();
}

function toggleTadghMode(){
  tadghMode = !tadghMode;
  tadghBtn.textContent = tadghMode ? "Tadgh Mode: On" : "Tadgh Mode: Off";
  tadghBtn.classList.toggle("on", tadghMode);
  loadCard();
}

loadCard();
