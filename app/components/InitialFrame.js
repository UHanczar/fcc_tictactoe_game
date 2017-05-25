import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InitialFrame extends Component {
  onOnePlayer() {
    this.props.handleOnePlayer();
  }

  render() {
    return (
      <div>
        <p>How do you want to play?</p>
        <button className='button' onClick={() => this.onOnePlayer()}>One player</button>
        <button className='button'>Two players</button>
      </div>
    );
  }
}

InitialFrame.propTyps = {
  handleOnePlayer: PropTypes.func.isRequired
};

export default InitialFrame;
