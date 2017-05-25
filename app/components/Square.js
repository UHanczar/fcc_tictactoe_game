import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Square extends Component {
  clickSquare(index) {
    this.props.handleClickSquare(index);
  }

  render() {
    const { value, index } = this.props;
    return (
      <div className='square' onClick={() => this.clickSquare(index)}>{value}</div>
    );
  }
}

Square.propTyps = {
  handleClickSquare: PropTypes.func.isRequired
};

export default Square;
