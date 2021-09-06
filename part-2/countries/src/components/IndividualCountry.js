import React from 'react';
import Weather from './Weather';

const IndividualCountry = ({ country }) => {
  console.log(`country`, country);
  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h4>Languages</h4>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img alt="flag" src={country.flag} style={{ width: 200 }} />
      <Weather city={country.capital} />
    </div>
  );
};

export default IndividualCountry;
