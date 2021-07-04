import React, { useState } from 'react';
import Button from './components/Button';

import Statistics from './components/Statistics';
import Header from './components/Header';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;

  // (good * 1 + neutral * 0 + bad * -1) / all
  const average = (good - bad) / all;

  const positivePercentage = (good / all) * 100;

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title={'Give feedback'} />
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <Header title={'Statistics'} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
