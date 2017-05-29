import React, { Component } from 'react';

import calcWinner from './../api/CalcWinner';

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
      winner: null,
      count: {
        X: 0,
        O: 0
      }
    };

    this.onHandleOnePlayer = this.onHandleOnePlayer.bind(this);
    this.onHandleSelectSign = this.onHandleSelectSign.bind(this);
    this.onHandleClickSquare = this.onHandleClickSquare.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winner !== prevState) {
      if (this.state.winner !== null) {
        this.transition = setTimeout(() => {
          this.reset();
        }, 3000);
      }
    }
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

    if (calcWinner.singlePlayer(newBoard) || newBoard[index] !== '') {
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

    if (calcWinner.singlePlayer(newBoard)) {
      xIsNext ? winner = 'X' : winner = 'O';
      xIsNext ? this.state.count.X++ : this.state.count.O++;
    }
  }

  reset() {
    this.setState(() => {
      return {
        board: [
          '', '', '',
          '', '', '',
          '', '', ''
        ],
        xIsNext: true,
        winner: null,
      };
    });
  }

  render() {
    const { board, frameView, winner } = this.state;

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
        case 'GAME':
          return (
            <div className='game'>
              <div className='game-info'>
                <p>Winner: { winner }</p>
                <p>Count X: {this.state.count.X} O: {this.state.count.O}</p>
                <button className='button prime hollow' onClick={this.reset}>Reset All</button>
              </div>
              <Board
                gameBoard={board}
                handleClickSquare={this.onHandleClickSquare}
              />
            </div>
          );
        // no default
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
