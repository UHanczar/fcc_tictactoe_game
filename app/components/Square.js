import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Square extends Component {
  clickSquare(index) {
    this.props.handleClickSquare(index);
  }

  render() {
    const { value, index, winner, winnerSquares } = this.props;
    return (
      <div className={winnerSquares !== ['a', 'a', 'a'] && winnerSquares[0] === index || winnerSquares[1] === index || winnerSquares[2] === index ? 'square winnerSquares' : 'square'} onClick={() => this.clickSquare(index)}>{value}</div>
    );
  }
}

Square.propTyps = {
  handleClickSquare: PropTypes.func.isRequired
};

export default Square;
