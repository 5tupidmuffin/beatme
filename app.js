const squares = document.querySelectorAll(".square");
squares.forEach((square, index) => {
  square.onclick = () => {
    move(index, true);
  };
});

let currentPlayer = true;
let board = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];

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
      return true;
    }
  }
  return false;
};

// check if the game draw
const isOver = (board) => {
  let count = 0;
  board.forEach((box) => {
    if (box !== "-") count++;
  });
  return count === 9 ? true : false;
};

const move = (index, player) => {
  if (board[index] === "-") {
    board[index] = player;
    squares[index].textContent = player ? "x" : "o";
    if (player) {
      computerMove();
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
  move(bestMove, false);
};
