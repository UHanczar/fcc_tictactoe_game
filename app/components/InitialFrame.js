import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InitialFrame extends Component {
  choosePlayerMode(mode) {
    this.props.handlePlayer(mode);
  }

  render() {
    return (
      <div className='initial-frame'>
        <h4>How do you want to play?</h4>
        <button className='button hollow primary' onClick={() => this.choosePlayerMode('singlePlayer')}>One player</button>
        <button className='button hollow primary' onClick={() => this.choosePlayerMode('playWithAI')}>Two players</button>
      </div>
    );
  }
}

InitialFrame.propTyps = {
  handlePlayer: PropTypes.func.isRequired
};

export default InitialFrame;
