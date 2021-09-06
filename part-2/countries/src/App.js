import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={allCountries} filter={filter} />
    </div>
  );
};

export default App;
