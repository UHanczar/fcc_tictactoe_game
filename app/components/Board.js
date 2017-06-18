import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

const Board = (props) => {
  const board = props.gameBoard;
  const handleClickSquare = props.handleClickSquare;
  return (
    <div className='board'>
      {board.map((square, i) => <Square key={i} index={i} value={board[i]} handleClickSquare={handleClickSquare} />)}
    </div>
  );
};

Board.propTyps = {
  gameBoard: PropTypes.array.isRequired
};

export default Board;
