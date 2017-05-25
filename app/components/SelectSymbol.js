import React, { Component } from 'react';
import PropTypes from 'prop-types';

class  SelectSymbol extends Component {
  selectSigh() {
    this.props.handleSelectSign();
  }
  render() {
    return (
      <div>
        <h2>Whould you like to be X or O</h2>
        <button className='button' onClick={() => this.selectSigh()}>X</button>
        <button className='button'>O</button>
      </div>
    )
  }
}

export default SelectSymbol;
