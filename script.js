const game = document.querySelector(".game");
const startButton = document.querySelector(".start");
const timer = document.querySelector(".actualTime");
const scoreDiv = document.querySelector(".actualScore");

let time;
let finalLetter;
let finalDiv;
let score;

const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const generateBubbles = function () {
  // clear previous layout
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => (row.innerHTML = ""));

  layout.forEach((letters, index) => {
    const row = document.querySelector(`.row${index + 1}`);

    letters.forEach((letter) => {
      const div = document.createElement("div");
      div.className = "letters";
      div.textContent = letter;
      row.appendChild(div);
    });
  });
};

const randomLetter = function () {
  const letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));

  const rows = document.querySelectorAll(".row");

  for (const row of rows) {
    const letterDivs = row.querySelectorAll(".letters");

    for (const letterDiv of letterDivs) {
      if (letterDiv.textContent === letter) {
        letterDiv.style.backgroundColor = "yellow";
        finalDiv = letterDiv;
        finalLetter = letter;
      }
    }
  }
};

const checkLetter = function (given) {
  if (given === finalLetter) {
    return true;
  }

  return false;
};

const reset = function () {
  const rows = document.querySelectorAll(".row");

  rows.forEach((row) => {
    row.innerHTML = "";
  });
};

let Int;

const start = function () {
  score = 0;
  time = 60;
  timer.innerHTML = time;
  scoreDiv.innerHTML = score;

  generateBubbles();
  // clearInterval(Int)
  randomLetter();
  Int = setInterval(() => {
    if (time === 0) {
      reset();
      clearInterval(Int);
    } else {
      time -= 1;
      timer.innerHTML = time;
    }
  }, 1000);

  const keyHandler = function (e) {
    if (checkLetter(e.key)) {
      score += 10;
      finalDiv.style.backgroundColor = "green";
      let check = finalDiv;

      async function Delay() {
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (check.style.backgroundColor === "green")
          check.style.backgroundColor = "aqua";
      }
      Delay();

      randomLetter();
    } else {
      score -= 10;
      finalDiv.style.backgroundColor = "red";

      async function Delay() {
        await new Promise((resolve) => setTimeout(resolve, 200));
        finalDiv.style.backgroundColor = "yellow";
      }
      Delay();
    }
    scoreDiv.innerHTML = score;
  };

  if (!isStart) document.addEventListener("keydown", keyHandler);
};
// start();

let isStart = false;
startButton.addEventListener("click", function () {
  clearInterval(Int);
  start();
  isStart = true;
});
