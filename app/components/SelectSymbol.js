import React, { Component } from 'react';
import PropTypes from 'prop-types';

class  SelectSymbol extends Component {
  selectSigh(sign) {
    this.props.handleSelectSign(sign);
  }
  render() {
    return (
      <div className='initial-frame'>
        <h4>Whould you like to be X or O</h4>
        <button className='button hollow primary button-wide' onClick={() => this.selectSigh('X')}>X</button>
        <button className='button hollow primary button-wide' onClick={() => this.selectSigh('O')}>O</button>
      </div>
    )
  }
}

export default SelectSymbol;
