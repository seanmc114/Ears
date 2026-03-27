const celebrities = [
  { name:"Adele", ear:"assets/adele-ear.svg", full:"assets/adele-reveal.svg", hint:"Big voice. British. Ballads everywhere.", aliases:["adele"] },
  { name:"Harry Styles", ear:"assets/harry-ear.svg", full:"assets/harry-reveal.svg", hint:"Feather boa energy. Former boyband.", aliases:["harry","harry styles"] },
  { name:"Rihanna", ear:"assets/rihanna-ear.svg", full:"assets/rihanna-reveal.svg", hint:"Umbrella. Singer and mogul.", aliases:["rihanna","riri","ri ri"] },
  { name:"Lionel Messi", ear:"assets/messi-ear.svg", full:"assets/messi-reveal.svg", hint:"Argentina. Left foot. Football genius.", aliases:["messi","lionel messi","leo messi"] },
  { name:"Beyoncé", ear:"assets/beyonce-ear.svg", full:"assets/beyonce-reveal.svg", hint:"Queen B.", aliases:["beyonce","beyoncé","queen b"] },
  { name:"Cristiano Ronaldo", ear:"assets/ronaldo-ear.svg", full:"assets/ronaldo-reveal.svg", hint:"CR7. Siuuu.", aliases:["ronaldo","cr7","cristiano","cristiano ronaldo"] },
  { name:"Zendaya", ear:"assets/zendaya-ear.svg", full:"assets/zendaya-reveal.svg", hint:"Dune. Spider-Man. Fashion icon.", aliases:["zendaya"] },
  { name:"Ed Sheeran", ear:"assets/ed-ear.svg", full:"assets/ed-reveal.svg", hint:"Red hair. Guitar. Loop pedal.", aliases:["ed","ed sheeran"] },
  { name:"Taylor Swift", ear:"assets/taylor-ear.svg", full:"assets/taylor-reveal.svg", hint:"Eras Tour.", aliases:["taylor","taylor swift","swift"] },
  { name:"The Weeknd", ear:"assets/weeknd-ear.svg", full:"assets/weeknd-reveal.svg", hint:"Blinding Lights.", aliases:["the weeknd","weeknd","abel"] },
  { name:"Lady Gaga", ear:"assets/gaga-ear.svg", full:"assets/gaga-reveal.svg", hint:"Poker Face. Monster energy.", aliases:["gaga","lady gaga"] },
  { name:"Barack Obama", ear:"assets/obama-ear.svg", full:"assets/obama-reveal.svg", hint:"44th US president.", aliases:["barack","obama","barack obama"] },
  { name:"Billie Eilish", ear:"assets/billie-ear.svg", full:"assets/billie-reveal.svg", hint:"Whisper-pop. Green era.", aliases:["billie","billie eilish"] },
  { name:"Drake", ear:"assets/drake-ear.svg", full:"assets/drake-reveal.svg", hint:"Toronto rapper.", aliases:["drake"] },
  { name:"Margot Robbie", ear:"assets/margot-ear.svg", full:"assets/margot-reveal.svg", hint:"Barbie.", aliases:["margot","margot robbie"] },
  { name:"Keanu Reeves", ear:"assets/keanu-ear.svg", full:"assets/keanu-reveal.svg", hint:"John Wick.", aliases:["keanu","keanu reeves"] },
  { name:"Dua Lipa", ear:"assets/dua-ear.svg", full:"assets/dua-reveal.svg", hint:"Dance-pop. Levitating.", aliases:["dua","dua lipa"] },
  { name:"Tom Holland", ear:"assets/tomh-ear.svg", full:"assets/tomh-reveal.svg", hint:"Spider-Man actor.", aliases:["tom holland","tom","holland"] },
  { name:"Sabrina Carpenter", ear:"assets/sabrina-ear.svg", full:"assets/sabrina-reveal.svg", hint:"Espresso.", aliases:["sabrina","sabrina carpenter"] },
  { name:"Pedro Pascal", ear:"assets/pedro-ear.svg", full:"assets/pedro-reveal.svg", hint:"The Last of Us.", aliases:["pedro","pedro pascal"] }
];

let deck = shuffle([...celebrities]);
let index = 0;
let score = 0;

const earImage = document.getElementById("earImage");
const fullImage = document.getElementById("fullImage");
const revealCard = document.getElementById("revealCard");
const answerText = document.getElementById("answerText");
const feedback = document.getElementById("feedback");
const guessInput = document.getElementById("guessInput");
const scoreEl = document.getElementById("score");
const cardNo = document.getElementById("cardNo");

document.getElementById("guessBtn").addEventListener("click", submitGuess);
document.getElementById("revealBtn").addEventListener("click", revealAnswer);
document.getElementById("hintBtn").addEventListener("click", giveHint);
document.getElementById("nextBtn").addEventListener("click", nextCard);
guessInput.addEventListener("keydown", e => { if(e.key === "Enter") submitGuess(); });

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

function normalize(text){
  return text.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function current(){ return deck[index]; }

function loadCard(){
  const celeb = current();
  earImage.src = celeb.ear;
  revealCard.classList.add("hidden");
  fullImage.src = "";
  answerText.textContent = "";
  guessInput.value = "";
  applyFeedback("intro");
  cardNo.textContent = index + 1;
}

function submitGuess(){
  const celeb = current();
  const guess = normalize(guessInput.value);
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
    applyFeedback("wrong", { guess: guessInput.value });
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
    applyFeedback("remix");
  }
  loadCard();
}

loadCard();


let tadghMode = false;

const normalFeedback = {
  intro: [
    "Ear first. Confidence second. Accuracy optional.",
    "Fresh deck. Fresh nonsense. Go on.",
    "New card. Trust your instincts. Or don't.",
    "Look at the ear, the vibe, the collar, the chaos."
  ],
  empty: [
    "Type a name first. Wild guesses encouraged.",
    "You need to actually guess someone."
  ],
  correct: [
    "✅ Correct. {name}. This is now an ear-based masterclass.",
    "✅ Yes. {name}. Outstanding behaviour.",
    "✅ Nailed it. {name} indeed."
  ],
  wrong: [
    "❌ Not {guess}. Honestly fair. Click Hint or Reveal.",
    "❌ Nope. Not {guess}. Reveal if you want to end the suspense."
  ],
  hint: [
    "Hint: {hint}",
    "Fine. Hint time: {hint}"
  ],
  remix: [
    "Deck remixed. AI chaos continues.",
    "Back to the top. Same game, new order."
  ]
};

const tadghFeedback = {
  intro: [
    "Tadgh Mode engaged. Pure notions. Big guesses only.",
    "Right. Let Tadgh at it. Zero fear. Dubious accuracy.",
    "Tadgh Mode: on. Confidence through the roof. Evidence optional.",
    "Go on. Tadgh reckons he has this from the lobe alone."
  ],
  empty: [
    "At least lash in a name, Tadgh.",
    "You have to guess someone. That's the whole scandal."
  ],
  correct: [
    "✅ Stop. He actually got {name}. Tadgh is unbearable now.",
    "✅ {name}. Tadgh will be dining out on this all week.",
    "✅ Correct. Tadgh strutting round the place after that."
  ],
  wrong: [
    "❌ Not {guess}. A bold shout. Completely wrong, but bold.",
    "❌ Ah here. Not {guess}. Tadgh has overcooked this one.",
    "❌ Wrong. Tadgh saw one earlobe and started freelancing."
  ],
  hint: [
    "Tadgh Hint: {hint}",
    "Alright then. Tadgh needs help: {hint}"
  ],
  remix: [
    "Deck remixed. Tadgh remains wildly overconfident.",
    "New order. Tadgh refuses to learn from previous events."
  ]
};

function pick(arr){
  return arr[Math.floor(Math.random() * arr.length)];
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

const tadghBtn = document.getElementById("tadghBtn");
tadghBtn.addEventListener("click", toggleTadghMode);

function toggleTadghMode(){
  tadghMode = !tadghMode;
  tadghBtn.textContent = tadghMode ? "Tadgh Mode: On" : "Tadgh Mode: Off";
  tadghBtn.classList.toggle("tadgh-on", tadghMode);
  applyFeedback("intro");
}
