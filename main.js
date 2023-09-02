let container = document.querySelector(".container");
let restartButton = document.querySelector(".restart-btn");
let resultGame = document.querySelector(".result");
let gameOver = false;
let boxArray = [];
let redBoxes = [];
let yellowBoxes = [];
let currPlayer = true;
for (let i = 1; i < 43; i++) {
  let box = document.createElement("div");
  box.className = "box";
  box.id = i;
  box.addEventListener("click", (e) => {
    if (gameOver) return null;
    let chosenBox = parseInt(e.target.id);
    // Check if the clicked field is in the last row (36 to 42)
    if (chosenBox >= 36) {
      allowBoxes(chosenBox, box);
    } else {
      // Check if the field below the clicked field is red or yellow
      let fieldBelow = chosenBox + 7;
      if (redBoxes.includes(fieldBelow) || yellowBoxes.includes(fieldBelow)) {
        allowBoxes(chosenBox, box);
      } else {
        // console.log("Invalid move");
        return;
      }
    }
    if (boxArray.indexOf(chosenBox) === -1) {
      boxArray.push(chosenBox);
    } else return currPlayer;
    if (currPlayer) {
      box.style.backgroundColor = "red";
      redBoxes.push(chosenBox);
      currPlayer = false;
    } else {
      box.style.backgroundColor = "yellow";
      yellowBoxes.push(chosenBox);
      currPlayer = true;
    }
    checkBoxes(chosenBox);
  });
  restartButton.addEventListener("click", () => {
    resetGame(box);
  });
  container.append(box);
}
function checkBoxes(chosenBox) {
  let intBox = parseInt(chosenBox);
  const winPatterns = [
    [1, 2, 3, 4],
    [-1, 0, 1, 2],
    [0, 1, 2, 3],
    [0, -1, -2, -3],
    [0, 7, 14, 21],
    [0, 6, 12, 18],
    [0, 8, 16, 24],
  ];

  for (const pattern of winPatterns) {
    const boxesInPattern = pattern.map((offset) => intBox + offset);
    if (
      (redBoxes.length >= 4 &&
        boxesInPattern.every((box) => redBoxes.includes(box))) ||
      (yellowBoxes.length >= 4 &&
        boxesInPattern.every((box) => yellowBoxes.includes(box)))
    ) {
      const winner = currPlayer ? "Yellow" : "Red";
      showResult(`${winner} player won`, currPlayer ? "yellow" : "red");
      gameOver = true;
      break;
    }
  }
}

function showResult(message, color) {
  resultGame.style.display = "block";
  resultGame.style.color = color;
  resultGame.textContent = message;
}

let chosenBoxArray = [];
function allowBoxes(chosenBox, box) {
  let intBox = parseInt(chosenBox);
  chosenBoxArray.push(intBox - 7);
  if (!chosenBoxArray.includes(intBox) && box.id < 36) {
    box.removeEventListener("click", () => {
      console.log("not allowed", chosenBoxArray);
      console.log("yellow", yellowBoxes);
      console.log("red", redBoxes);
      return null;
    });
  }
}

function resetGame(box) {
  gameOver = false;
  boxArray.length = 0;
  redBoxes.length = [];
  yellowBoxes.length = [];
  chosenBoxArray = [];
  currPlayer = true;
  resultGame.style.display = "none";
  box.style.backgroundColor = "";
}
