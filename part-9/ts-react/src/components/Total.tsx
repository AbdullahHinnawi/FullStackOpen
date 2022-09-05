import React from 'react';

interface TotalProps {
  sum: number;
}
const Total = ({ sum }: TotalProps) => {
  return <p>Number of exercises {sum}</p>;
};

export default Total;
