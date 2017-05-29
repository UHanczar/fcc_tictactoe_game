import React, { Component } from 'react';
import PropTypes from 'prop-types';

class  SelectSymbol extends Component {
  selectSigh() {
    this.props.handleSelectSign();
  }
  render() {
    return (
      <div className='initial-frame'>
        <h4>Whould you like to be X or O</h4>
        <button className='button hollow primary button-wide' onClick={() => this.selectSigh()}>X</button>
        <button className='button hollow primary button-wide'>O</button>
      </div>
    )
  }
}

export default SelectSymbol;
