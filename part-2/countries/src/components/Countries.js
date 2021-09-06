import React, { useState, useEffect } from 'react';
import CountryNameBesideButton from './CountryNameBesideButton';
import IndividualCountry from './IndividualCountry';

const Countries = ({ countries, filter }) => {
  const [filteringResult, setFilteringResult] = useState([]);
  const [filteringResultLength, setFilteringResultLength] = useState();

  useEffect(() => {
    const result = countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteringResult(result);
    setFilteringResultLength(result.length);
  }, [filter, countries]);

  return (
    <div>
      {filteringResultLength > 10 && filter !== '' && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteringResultLength <= 10 &&
        filteringResultLength > 1 &&
        filteringResult.map((country) => (
          <CountryNameBesideButton key={country.name} country={country} />
        ))}
      {filteringResultLength === 1 &&
        filteringResult.map((country) => (
          <IndividualCountry key={country.name} country={country} />
        ))}
    </div>
  );
};

export default Countries;
