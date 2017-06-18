const singlePlayer = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const copyBoard = (board) => {
  return board.slice();
}

const tie = (board) => {
  const moves = board.filter(val => val === '').length;
  // console.log(moves);
  if (moves === 0) {
    return true;
  } else {
    return false;
  }
}

const validMove = (move, player, board) => {
  const newBoard = copyBoard(board);
  if (newBoard[move] === '') {
    newBoard[move] = player;
    return newBoard;
  } else {
    return false;
  }
};

const findAIMove = (board, player, winner) => {
  console.log(board, player, winner)
  let bestScoreMove = 100;
  let move = 0;

  if (winner) {
    return false;
  }

  for (let i = 0; i < board.length; i++) {
    const newBoard = validMove(i, player, board);
    console.log(newBoard);

    if(newBoard) {
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === '') {
          newBoard[i] = player;
        }
      }
      return newBoard;
    }
    // if (newBoard) {
    //   const moveScore = maxScore(newBoard, winner, player);
    //
    //   if (moveScore < bestScoreMove) {
    //     bestScoreMove = moveScore;
    //     move = i;
    //   }
    // }
  }

  // return move;
};

const minScore = (board, winner, player) => {
    if (winner && player === 'X') {
      return 10;
    } else if (winner && player === 'O') {
      return -10;
    } else if (tie(board)) {
      return 0;
    } else {
      let bestMoveValue = 100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = validMove(i, player, board);
        if (newBoard) {
          const predictedMovieValue = maxScore(newBoard, winner, player);
          if (predictedMovieValue < bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

const maxScore = (board, winner, player) => {
    if (winner && player === 'X') {
      return 10;
    } else if (winner && player === 'O') {
      return -10;
    } else if (tie(board)) {
      return 0;
    } else {
      let bestMoveValue = -100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = validMove(i, player, board);
        if (newBoard) {
          const predictedMovieValue = minScore(newBoard, winner, player);
          if (predictedMovieValue > bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }


export default {
  singlePlayer,
  validMove,
  tie,
  findAIMove,
  minScore,
  maxScore
};
