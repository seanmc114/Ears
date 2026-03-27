const celebs = [
  {
    name: "Cristiano Ronaldo",
    ear: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    hint: "Footballer. Portugal."
  },
  {
    name: "Taylor Swift",
    ear: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Taylor_Swift_Red_Tour.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Taylor_Swift_Red_Tour.jpg",
    hint: "Singer. Eras Tour."
  },
  {
    name: "Barack Obama",
    ear: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg",
    hint: "US President."
  },
  {
    name: "Lionel Messi",
    ear: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Lionel_Messi_20180626.jpg",
    full: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Lionel_Messi_20180626.jpg",
    hint: "Argentina footballer."
  }
];

let i = 0;

function load() {
  document.getElementById("earImage").src = celebs[i].ear;
  document.getElementById("feedback").textContent = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("revealBox").classList.add("hidden");
}

function submitGuess() {
  let guess = document.getElementById("guessInput").value.toLowerCase();
  let answer = celebs[i].name.toLowerCase();

  if (guess === answer) {
    document.getElementById("feedback").textContent = "✅ Correct!";
  } else {
    document.getElementById("feedback").textContent = "❌ Nope!";
  }
}

function giveHint() {
  document.getElementById("feedback").textContent = celebs[i].hint;
}

function reveal() {
  document.getElementById("fullImage").src = celebs[i].full;
  document.getElementById("answer").textContent = celebs[i].name;
  document.getElementById("revealBox").classList.remove("hidden");
}

function next() {
  i++;
  if (i >= celebs.length) i = 0;
  load();
}

load();
