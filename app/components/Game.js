import React, { Component } from 'react';

import calcWinnerInSinglePlayer from './../api/CalcWinner';

import InitialFrame from './InitialFrame';
import SelectSymbol from './SelectSymbol';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      frameView: 'INITIAL_FRAME',
      xIsNext: true,
      winner: null
    };

    this.onHandleOnePlayer = this.onHandleOnePlayer.bind(this);
    this.onHandleSelectSign = this.onHandleSelectSign.bind(this);
    this.onHandleClickSquare = this.onHandleClickSquare.bind(this);
  }

  onHandleOnePlayer() {
    // console.log(this);
    this.setState(() => {
      return {
        frameView: 'SELECT_SYMBOL'
      };
    });
  }

  onHandleSelectSign() {
    // console.log('Sign');
    this.setState(() => {
      return {
        frameView: 'GAME'
      };
    });
  }

  onHandleClickSquare(index) {
    // console.log('Click', index);
    const { xIsNext } = this.state;
    let { winner } = this.state;
    const newBoard = this.state.board.slice();

    if (calcWinnerInSinglePlayer(newBoard) || newBoard[index] !== '') {
      return;
    } else {
      if (xIsNext) {
        newBoard[index] = 'X';
      } else {
        newBoard[index] = 'O';
      }
    }

    this.setState(() => {
      return {
        board: newBoard,
        xIsNext: !xIsNext,
        winner: winner
      };
    });

    if (calcWinnerInSinglePlayer(newBoard)) {
      xIsNext ? winner = 'X' : winner = 'O';
      console.log(winner);
    }
    console.log(winner);
  }

  render() {
    const { board, frameView, winner } = this.state;
    // const currentWinner = calcWinnerInSinglePlayer(board);
    const changeView = () => {
      // console.log(frameView);
      // console.log(winner);

      switch (frameView) {
        case 'INITIAL_FRAME':
          return (<InitialFrame
            handleOnePlayer={this.onHandleOnePlayer}
          />);
        case 'SELECT_SYMBOL':
          return (<SelectSymbol
            handleSelectSign={this.onHandleSelectSign}
          />);
        case 'Game':
          return (
            <div>
              <p>Winner: { winner }</p>
              <Board
                gameBoard={board}
                handleClickSquare={this.onHandleClickSquare}
              />
            </div>
          );
        default:
          return (
            <div>
              <p>Winner: { winner }</p>
              <Board
                gameBoard={board}
                handleClickSquare={this.onHandleClickSquare}
              />
            </div>
          );
      }
    };

    return (
      <div className='game'>
        {changeView()}
      </div>
    );
  }
}

export default Game;
