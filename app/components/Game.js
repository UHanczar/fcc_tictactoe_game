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
      maxPlayer: undefined,
      minPlayer: undefined,
      winner: null,
      count: {
        X: 0,
        O: 0
      }
    };

    this.onHandlePlayer = this.onHandlePlayer.bind(this);
    this.onHandleSelectSign = this.onHandleSelectSign.bind(this);
    this.onHandleClickSquare = this.onHandleClickSquare.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.winner !== prevState) {
      if (this.state.winner !== null) {
        this.transition = setTimeout(() => {
          if (this.state.gameMode === 'singlePlayer') {
            this.setState(() => {
              return {
                xIsNext: this.state.xIsNext ? this.state.xIsNext = false : this.state.xIsNext = true
              };
            });
          }

          this.setState(() => {
            return {
              board: [
                '', '', '',
                '', '', '',
                '', '', ''
              ],
              winner: null
            };
          });
        }, 3000);
      }
    }
    // clearTimeout(this.transition);
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
      // no default
    }
  }

  onHandleSelectSign(sign) {
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
          frameView: 'PLAY_WITH_AI'
        };
      });
    }

    if (sign === 'X') {
      this.setState(() => {
        return {
          xIsNext: true,
          maxPlayer: 'X',
          minPlayer: 'O'
        };
      });
    } else if (sign === 'O') {
      this.setState(() => {
        return {
          xIsNext: false,
          maxPlayer: 'O',
          minPlayer: 'X'
        };
      });
    }
  }

  onHandleClickSquare(index) {
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

    if (calcWinner.tie(newBoard)) {
      winner = 'Draw';
    }

    if (calcWinner.singlePlayer(newBoard)) {
      xIsNext ? winner = 'X' : winner = 'O';
      xIsNext ? this.state.count.X++ : this.state.count.O++;
    }

    this.setState(() => {
      return {
        board: newBoard,
        xIsNext: !xIsNext,
        winner
      };
    });
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
        count: {
          X: 0,
          O: 0
        }
      };
    });
  }

  copyBoard(board) {
    return board.slice(0);
  }

  validMove(move, player, board) {
    // console.log(move, player, board);
    const newBoard = this.copyBoard(board);
    if (newBoard[move] === '') {
      newBoard[move] = player;
      return newBoard;
    } else {
      return false;
    }
  }

  findAIMove(board) {
    const { minPlayer } = this.state;
    let bestMoveScore = 100;
    let move = null;
    // test all possible moves if game not over
    if (calcWinner.singlePlayer(board) || calcWinner.tie(board)) {
      return;
    }

    for (let i = 0; i < board.length; i++) {
      const newBoard = this.validMove(i, minPlayer, board);
      if (newBoard) {
        const moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }

    return move;
  }

  minScore(board) {
    const { winner, minPlayer } = this.state;
    if (calcWinner.singlePlayer(board) && winner === 'X') { // may be calcWinner
      return 10;
    } else if (calcWinner.singlePlayer(board) && winner === 'O') {
      return -10;
    } else if (calcWinner.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = 100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = this.validMove(i, minPlayer, board);
        if (newBoard) {
          const predictedMovieValue = this.maxScore(newBoard);
          if (predictedMovieValue < bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  maxScore(board) {
    const { winner, maxPlayer } = this.state;
    if (calcWinner.singlePlayer(board) && winner === 'X') {
      return 10;
    } else if (calcWinner.singlePlayer(board) && winner === 'O') {
      return -10;
    } else if (calcWinner.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = -100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = this.validMove(i, maxPlayer, board);
        if (newBoard) {
          const predictedMovieValue = this.minScore(newBoard);

          if (predictedMovieValue > bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(index) {
    const { winner, board, xIsNext, maxPlayer, minPlayer, count } = this.state;
    let player = maxPlayer;
    let currentBoard = this.validMove(index, player, board);

    if (winner) {
      return false;
    }

    if (currentBoard) {
      if (calcWinner.singlePlayer(currentBoard)) {
        player === 'X' ? this.state.count.X++ : this.state.count.O++;

        this.setState({
          board: currentBoard,
          winner: player
        });
        return false;
      }

      if (calcWinner.tie(currentBoard)) {
        this.setState({
          board: currentBoard,
          winner: 'Draw'
        });
        return false;
      }

      if (player) {
        this.setState(() => {
          return {
            xIsNext: !xIsNext
          };
        });
      }

      player = minPlayer;
      currentBoard = this.validMove(this.findAIMove(currentBoard), minPlayer, currentBoard);

      if (currentBoard) {
        if (calcWinner.singlePlayer(currentBoard)) {
          player === 'X' ? this.state.count.X++ : this.state.count.O++;
          this.setState({
            board: currentBoard,
            winner: player
          });
          return false;
        }
        if (calcWinner.tie(currentBoard)) {
          this.setState({
            board: currentBoard,
            winner: 'Draw'
          });
        }

        this.setState(() => {
          return {
            board: currentBoard
          };
        });
      }
    }
  }

  render() {
    const { board, frameView, winner } = this.state;

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
        case 'PLAY_WITH_AI':
          return (
            <div className='game'>
              <div className='game-info'>
                <p>Winner: { winner }</p>
                <p>Count X: {this.state.count.X} O: {this.state.count.O}</p>
                <button className='button prime hollow' onClick={this.reset}>Reset All</button>
              </div>
              <Board
                gameBoard={board}
                handleClickSquare={this.gameLoop}
              />
            </div>
          )
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
