import React, { Component } from 'react';

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
      frameView: 'INITIAL_FRAME'
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
      }
    })
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
    const { board, frameView } = this.state;
    const changeView = () => {
      console.log(frameView);
      // return (playerNum ?
      //   <InitialFrame
      //     handleOnePlayer={this.onHandleOnePlayer}
      //   /> :
      //   <Board
      //     gameBoard={board}
      //     handleClickSquare={this.onHandleClickSquare}
      //   />
      // );
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
          return (<Board
            gameBoard={board}
            handleClickSquare={this.onHandleClickSquare}
          />);
        default:
          return (<Board
            gameBoard={board}
            handleClickSquare={this.onHandleClickSquare}
          />);
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
