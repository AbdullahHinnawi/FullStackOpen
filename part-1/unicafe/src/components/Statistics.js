import React from 'react';
import Statistic from './Statistic';

const Statistics = (props) => {
  const { good, neutral, bad, all } = props;
  let { average, positivePercentage } = props;

  if (!good && !neutral && !bad) {
    return <div>No feedback given</div>;
  }

  if (!average) average = 0;
  if (average < 0) average *= -1;
  if (!positivePercentage) positivePercentage = 0;

  return (
    <div>
      <table>
        <tbody>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={all} />
          <Statistic text="Average" value={average} />
          <Statistic text="Positive" value={positivePercentage + ' %'} />
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
