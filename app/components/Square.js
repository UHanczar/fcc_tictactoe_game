import React, { Component } from 'react';

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

export default Square;
