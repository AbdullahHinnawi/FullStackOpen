import React from 'react';

const Total = ({ course }) => {
  // 0 is the initial value of x
  const sum = course.parts.reduce((x, part) => x + part.exercises, 0);
  return <p style={{ fontWeight: 'bold' }}>Total of {sum} exercises</p>;
};
export default Total;
