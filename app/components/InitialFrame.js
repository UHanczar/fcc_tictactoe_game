import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InitialFrame extends Component {
  onOnePlayer() {
    this.props.handleOnePlayer();
  }

  render() {
    return (
      <div className='initial-frame'>
        <h4>How do you want to play?</h4>
        <button className='button hollow primary' onClick={() => this.onOnePlayer()}>One player</button>
        <button className='button hollow primary'>Two players</button>
      </div>
    );
  }
}

InitialFrame.propTyps = {
  handleOnePlayer: PropTypes.func.isRequired
};

export default InitialFrame;
