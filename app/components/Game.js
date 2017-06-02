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
      gameMode: undefined,
      xIsNext: undefined,
      winner: null,
      count: {
        X: 0,
        O: 0
      }
    };

    this.onHandlePlayer = this.onHandlePlayer.bind(this);
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
    // clearTimeout(this.transition);
  }

  tie(board) {
    const moves = board.filter(val => val === '').length - 1;
    // console.log(moves);
    if (moves === 0) {
      return true;
    } else {
      return false;
    }
  }

  onHandlePlayer(mode) {
    console.log(mode);
    switch (mode) {
      case 'singlePlayer':
        return this.setState(() => {
          return {
            frameView: 'SELECT_SYMBOL',
            gameMode: mode
          };
        });
      case 'playWithAI':
        return this.setState(() => {
          return {
            frameView: 'SELECT_SYMBOL',
            gameMode: mode
          };
        });
    }
  }

  onHandleSelectSign(sign) {
    // console.log(sign);
    const { gameMode } = this.state;
    if (gameMode === 'singlePlayer') {
      this.setState(() => {
        return {
          frameView: 'SINGLE_PLAYER_GAME'
        };
      });
    } else {
      this.setState(() => {
        return {
          frameView: undefined
        };
      });
    }

    if (sign === 'X') {
      this.setState(() => {
        return {
          xIsNext: true
        };
      });
    } else if (sign === 'O') {
      this.setState(() => {
        return {
          xIsNext: false
        };
      });
    }
  }

  onHandleClickSquare(index) {
    // console.log('Click', index);
    const { xIsNext } = this.state;
    let { winner } = this.state;
    const newBoard = this.state.board.slice();

    if (this.tie(newBoard)) {
      winner = 'Draw';
    }

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
      // this.state.xIsNext ? this.state.xIsNext = true : this.state.xIsNext = false;
    }
  }

  reset() {
    clearTimeout(this.transition);
    this.setState(() => {
      return {
        board: [
          '', '', '',
          '', '', '',
          '', '', ''
        ],
        xIsNext: this.state.xIsNext ? this.state.xIsNext = false : this.state.xIsNext = true,
        winner: null,
      };
    });
  }

  render() {
    const { board, frameView, winner, gameMode } = this.state;

    const changeView = () => {
      // console.log(frameView);
      // console.log(winner);

      switch (frameView) {
        case 'INITIAL_FRAME':
          return (<InitialFrame
            handlePlayer={this.onHandlePlayer}
          />);
        case 'SELECT_SYMBOL':
          return (<SelectSymbol
            handleSelectSign={this.onHandleSelectSign}
          />);
        case 'SINGLE_PLAYER_GAME':
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
