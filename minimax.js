/*
  ref:
    https://www.youtube.com/watch?v=l-hh51ncgDI
    https://www.youtube.com/watch?v=2Tr8LkyU78c
*/

const minimax = (position, depth, alpha, beta, maximizingPlayer) => {
  if (isWin(position, false)) return 10;
  if (isWin(position, true)) return -10;
  if (depth <= 0 || isOver(position)) return 0;

  if (maximizingPlayer) {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (let idx in position) {
      let tempEval = Number.NEGATIVE_INFINITY;
      if (position[idx] === "-") {
        position[idx] = false;
        tempEval = minimax(position, depth - 1, alpha, beta, false);
        position[idx] = "-";
      }
      maxEval = Math.max(tempEval, maxEval);
      alpha = Math.max(alpha, tempEval);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (let idx in position) {
      let tempEval = Number.POSITIVE_INFINITY;
      if (position[idx] === "-") {
        position[idx] = true;
        tempEval = minimax(position, depth - 1, alpha, beta, true);
        position[idx] = "-";
      }
      minEval = Math.min(tempEval, minEval);
      beta = Math.min(beta, tempEval);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};
