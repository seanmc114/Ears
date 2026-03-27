const celebrities = [
  { name:"Adele", ear:"assets/adele-ear.svg", full:"assets/adele-reveal.svg", hint:"Big voice. British. Ballads.", aliases:["adele"] },
  { name:"Harry Styles", ear:"assets/harry-ear.svg", full:"assets/harry-reveal.svg", hint:"Former boyband. Feather boa energy.", aliases:["harry","harry styles"] },
  { name:"Rihanna", ear:"assets/rihanna-ear.svg", full:"assets/rihanna-reveal.svg", hint:"Umbrella.", aliases:["rihanna","riri","ri ri"] },
  { name:"Lionel Messi", ear:"assets/messi-ear.svg", full:"assets/messi-reveal.svg", hint:"Argentina. Left foot.", aliases:["messi","lionel messi","leo messi"] },
  { name:"Beyoncé", ear:"assets/beyonce-ear.svg", full:"assets/beyonce-reveal.svg", hint:"Queen B.", aliases:["beyonce","beyoncé","queen b"] },
  { name:"Cristiano Ronaldo", ear:"assets/ronaldo-ear.svg", full:"assets/ronaldo-reveal.svg", hint:"CR7.", aliases:["ronaldo","cr7","cristiano","cristiano ronaldo"] },
  { name:"Zendaya", ear:"assets/zendaya-ear.svg", full:"assets/zendaya-reveal.svg", hint:"Dune. Fashion icon.", aliases:["zendaya"] },
  { name:"Ed Sheeran", ear:"assets/ed-ear.svg", full:"assets/ed-reveal.svg", hint:"Red hair. Guitar.", aliases:["ed","ed sheeran"] },
  { name:"Taylor Swift", ear:"assets/taylor-ear.svg", full:"assets/taylor-reveal.svg", hint:"Eras Tour.", aliases:["taylor","taylor swift","swift"] },
  { name:"The Weeknd", ear:"assets/weeknd-ear.svg", full:"assets/weeknd-reveal.svg", hint:"Blinding Lights.", aliases:["the weeknd","weeknd","abel"] },
  { name:"Lady Gaga", ear:"assets/gaga-ear.svg", full:"assets/gaga-reveal.svg", hint:"Poker Face.", aliases:["gaga","lady gaga"] },
  { name:"Barack Obama", ear:"assets/obama-ear.svg", full:"assets/obama-reveal.svg", hint:"44th US president.", aliases:["barack","obama","barack obama"] }
];

const normalFeedback = {
  intro: [
    "Fresh deck. Fresh ears. Go on.",
    "Look at the ear, the hair, the collar, the chaos.",
    "Ear first. Confidence second. Accuracy optional."
  ],
  empty: [
    "Type a name first.",
    "You need an actual guess first."
  ],
  correct: [
    "✅ Correct. {name}.",
    "✅ Yes. {name}. Strong ear work.",
    "✅ Nailed it. {name} indeed."
  ],
  wrong: [
    "❌ Not {guess}. Fair swing though.",
    "❌ Nope. Not {guess}. Hit Hint or Reveal."
  ],
  hint: [
    "Hint: {hint}",
    "Fine. Hint time: {hint}"
  ],
  remix: [
    "Deck reshuffled. New ears.",
    "Back to the top. Same ears, new order."
  ]
};

const tadghFeedback = {
  intro: [
    "Tadgh Mode engaged. Pure notions.",
    "Right. Tadgh Mode on. Massive confidence. Variable accuracy.",
    "Go on. Tadgh reckons he has this from the lobe alone."
  ],
  empty: [
    "At least lash in a name, Tadgh.",
    "You still have to guess someone."
  ],
  correct: [
    "✅ Stop. He actually got {name}. Tadgh is insufferable now.",
    "✅ {name}. Tadgh will be talking about this all week."
  ],
  wrong: [
    "❌ Not {guess}. Bold. Completely wrong, but bold.",
    "❌ Ah here. Not {guess}. Tadgh has overcooked it."
  ],
  hint: [
    "Tadgh Hint: {hint}",
    "Alright then. Tadgh needs help: {hint}"
  ],
  remix: [
    "Deck remixed. Tadgh remains wildly overconfident.",
    "New order. Tadgh learns nothing from previous events."
  ]
};

let deck = shuffle([...celebrities]);
let index = 0;
let score = 0;
let tadghMode = false;

const earImage = document.getElementById("earImage");
const fullImage = document.getElementById("fullImage");
const revealCard = document.getElementById("revealCard");
const answerText = document.getElementById("answerText");
const feedback = document.getElementById("feedback");
const guessInput = document.getElementById("guessInput");
const scoreEl = document.getElementById("score");
const cardNo = document.getElementById("cardNo");
const guessBtn = document.getElementById("guessBtn");
const revealBtn = document.getElementById("revealBtn");
const hintBtn = document.getElementById("hintBtn");
const nextBtn = document.getElementById("nextBtn");
const tadghBtn = document.getElementById("tadghBtn");

guessBtn.addEventListener("click", submitGuess);
revealBtn.addEventListener("click", revealAnswer);
hintBtn.addEventListener("click", giveHint);
nextBtn.addEventListener("click", nextCard);
tadghBtn.addEventListener("click", toggleTadghMode);
guessInput.addEventListener("keydown", e => {
  if(e.key === "Enter") submitGuess();
});

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(text){
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function current(){
  return deck[index];
}

function feedbackSet(){
  return tadghMode ? tadghFeedback : normalFeedback;
}

function applyFeedback(kind, vars = {}){
  let text = pick(feedbackSet()[kind]);
  Object.keys(vars).forEach(key => {
    text = text.replaceAll("{" + key + "}", vars[key]);
  });
  feedback.innerHTML = text;
}

function loadCard(){
  const celeb = current();
  earImage.src = celeb.ear;
  revealCard.classList.add("hidden");
  fullImage.src = "";
  answerText.textContent = "";
  guessInput.value = "";
  cardNo.textContent = index + 1;
  applyFeedback("intro");
}

function submitGuess(){
  const celeb = current();
  const guessRaw = guessInput.value.trim();
  const guess = normalize(guessRaw);
  if(!guess){
    applyFeedback("empty");
    return;
  }
  const right = celeb.aliases.some(a => normalize(a) === guess);
  if(right){
    score++;
    scoreEl.textContent = score;
    applyFeedback("correct", { name: "<strong>" + celeb.name + "</strong>" });
    revealAnswer();
  } else {
    applyFeedback("wrong", { guess: guessRaw });
  }
}

function revealAnswer(){
  const celeb = current();
  answerText.textContent = celeb.name;
  fullImage.src = celeb.full;
  revealCard.classList.remove("hidden");
}

function giveHint(){
  applyFeedback("hint", { hint: current().hint });
}

function nextCard(){
  index++;
  if(index >= deck.length){
    deck = shuffle([...celebrities]);
    index = 0;
  }
  loadCard();
}

function toggleTadghMode(){
  tadghMode = !tadghMode;
  tadghBtn.textContent = tadghMode ? "Tadgh Mode: On" : "Tadgh Mode: Off";
  tadghBtn.classList.toggle("tadgh-on", tadghMode);
  applyFeedback("intro");
}

loadCard();
