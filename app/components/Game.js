import React, { Component } from 'react';

import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    };
  }
  render() {
    const { board } = this.state;
    return (
      <div className='game'>
        <Board gameBoard={board} />
      </div>
    );
  }
}

export default Game;
