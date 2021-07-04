import React from 'react';

const Statistic = ({ text, value }) => {
  if (!value) value = 0;
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

export default Statistic;
