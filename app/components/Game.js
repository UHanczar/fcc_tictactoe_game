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

    this.onHandleClickSquare = this.onHandleClickSquare.bind(this);
  }

  onHandleClickSquare(index) {
    console.log('Click');
    console.log(index);
    const newBoard = this.state.board.slice();
    newBoard[index] = index;
    this.setState(() => {
      return {
        board: newBoard
      };
    });
  }

  render() {
    const { board } = this.state;
    return (
      <div className='game'>
        <Board gameBoard={board} handleClickSquare={this.onHandleClickSquare} />
      </div>
    );
  }
}

export default Game;
