import React from 'react';

const Square = (props) => {
  const value = props.value;
  return (
    <div className='square'>{value}</div>
  );
};

export default Square;
