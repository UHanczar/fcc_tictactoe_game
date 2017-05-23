import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

const Board = (props) => {
  const board = props.gameBoard;
  return (
    <div className='board'>
      {board.map((square, i) => <Square key={i} value={i} />)}
    </div>
  );
};

Board.propTyps = {
  board: PropTypes.array.isRequired
};

export default Board;
