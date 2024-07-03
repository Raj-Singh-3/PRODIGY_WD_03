let boxes = document.querySelectorAll(".box");
let header = document.querySelector(".header");
let statement = document.querySelector("#statement");
let valO = true;
let bg = document.querySelector(".bg");
let playWithComputer = false;

window.onload = () => {
  playWithComputer = confirm("Do you want to play with the computer?");
};

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

for (let box of boxes) {
  box.addEventListener("click", () => {
    if (valO) {
      box.innerText = "O";
      box.style.color = "white";
      valO = false;
      bg.style.transform = "translateX(85px)";
    } else {
      box.innerText = "X";
      box.style.color = "white";
      valO = true;
      bg.style.transform = "translateX(0)";
    }
    box.disabled = true;
    checker();
    if (playWithComputer && !valO && !isGameWon()) {
      setTimeout(computerMove, 500);
    }
  });
}

const computerMove = () => {
  let availableBoxes = [];
  for (let box of boxes) {
    if (box.innerText === "A") {
      availableBoxes.push(box);
    }
  }

  if (availableBoxes.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableBoxes.length);
    let randomBox = availableBoxes[randomIndex];
    randomBox.innerText = "X";
    randomBox.style.color = "white";
    randomBox.disabled = true;
    valO = true;
    bg.style.transform = "translateX(0)";
    checker();
  }
};

const buttonDisabler = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const buttonEnabler = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "A";
    box.style.color = "transparent";
  }
};

const isGameWon = () => {
  for (let pattern of winPatterns) {
    let pos1 = pattern[0];
    let pos2 = pattern[1];
    let pos3 = pattern[2];
    if (boxes[pos1].innerText !== "A") {
      if (
        boxes[pos1].innerText === boxes[pos2].innerText &&
        boxes[pos2].innerText === boxes[pos3].innerText
      ) {
        return true;
      }
    }
  }
  return false;
};

const checker = () => {
  if (isGameWon()) {
    for (let pattern of winPatterns) {
      let pos1 = pattern[0];
      let pos2 = pattern[1];
      let pos3 = pattern[2];
      if (boxes[pos1].innerText !== "A") {
        if (
          boxes[pos1].innerText === boxes[pos2].innerText &&
          boxes[pos2].innerText === boxes[pos3].innerText
        ) {
          console.log("winner is " + boxes[pos1].innerText);
          let a = "winner is " + boxes[pos1].innerText;
          statement.innerText = a;
          header.style.visibility = "visible";
          buttonDisabler();
        }
      }
    }
  }
};

const resetGame = () => {
  buttonEnabler();
  header.style.visibility = "hidden";
  bg.style.transform = "translateX(0)";
  valO = true;
};

const newGame = () => {
  buttonEnabler();
  header.style.visibility = "hidden";
  bg.style.transform = "translateX(0)";
  valO = true;
};
