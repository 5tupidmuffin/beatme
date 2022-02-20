const squares = document.querySelectorAll(".square");
squares.forEach((square, index) => {
  square.onclick = () => {
    move(index, true);
  };
});

// details
const games = document.querySelector("#games");
const wins = document.querySelector("#wins");
const defeats = document.querySelector("#defeats");
const time = document.querySelector("#time");

// counter
let winsCount = 0,
  defeatsCount = 0,
  gamesCount = 0;

const modal = document.querySelector(".modal");
const messageSpan = document.querySelector(".message");
let isOpen = false;
const toggleMessage = (message) => {
  if (!isOpen) {
    isOpen = true;
    messageSpan.textContent = message;
    setTimeout(() => modal.classList.toggle("hidden"), 700);
  }
};

let currentPlayer = true;
let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
let isRunning = true;

// possible winning positions
const winCombos = [
  // horizontal lines
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical lines
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal lines
  [0, 4, 8],
  [2, 4, 6],
];

// check for a winner
const isWin = (board, player) => {
  for (let combo of winCombos) {
    let c1 = combo[0];
    c2 = combo[1];
    c3 = combo[2];

    if (
      board[c1] === board[c2] &&
      board[c2] === board[c3] &&
      board[c1] === player
    ) {
      return combo;
    }
  }
  return false;
};

// color the winning combo green
const colorWin = () => {
  let indices = isWin(board, true) || isWin(board, false);
  for (let idx of indices) {
    squares[idx].style.color = "green";
  }
};

// check if the game draw
const isOver = (board) => {
  let count = 0;
  board.forEach((box) => {
    if (box !== "-") count++;
  });
  return count === 9 ? true : false;
};

// reset whole game
const reset = () => {
  isRunning = true;
  board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  squares.forEach((square) => {
    square.textContent = "-";
    square.style.color = "var(--yellow)";
  });
  isOpen = false;
  modal.classList.toggle("hidden");
};

const move = (index, player) => {
  if (board[index] === "-" && isRunning) {
    board[index] = player;
    squares[index].textContent = player ? "X" : "O";
    if (isWin(board, true) || isWin(board, false)) {
      isRunning = false;
      colorWin();
      if (isWin(board, false)) {
        toggleMessage("Computer Won!");
      } else {
        toggleMessage("You Won! o.O"); // not possible :p
      }
    }
    if (isOver(board)) toggleMessage("it's a Draw!");
    if (player) {
      let start = Date.now();
      computerMove();
      time.textContent = Date.now() - start;
    }
  }
};

const computerMove = () => {
  let bestScore = Number.NEGATIVE_INFINITY,
    bestMove = 0,
    score = Number.NEGATIVE_INFINITY;

  for (let idx in board) {
    if (board[idx] === "-") {
      board[idx] = false;
      score = minimax(
        board,
        5,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        false
      );
      board[idx] = "-";
      if (score > bestScore) {
        bestScore = score;
        bestMove = idx;
      }
    }
  }
  wins.textContent = winsCount;
  defeats.textContent = defeatsCount;
  games.textContent = gamesCount;
  winsCount = 0;
  defeatsCount = 0;
  gamesCount = 0;
  move(bestMove, false);
};
