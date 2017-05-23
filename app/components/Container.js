import React, { Component } from 'react';

import Game from './Game';

class Container extends Component {
  render() {
    return (
      <div className='container'>
        <h1>Free Code Camp Tic Tac Toe Game</h1>
        <Game />
      </div>
    );
  }
}

export default Container;
