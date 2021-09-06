import React, { useState } from 'react';
import IndividualCountry from './IndividualCountry';

const CountryNameBesideButton = ({ country }) => {
  const [showCountryInfo, setShowCountryInfo] = useState(false);
  const handleClick = () => {
    setShowCountryInfo(!showCountryInfo);
  };

  return (
    <div style={{ padding: 3 }}>
      {country.name}
      <button onClick={handleClick} style={{ marginLeft: 5 }}>
        Show
      </button>
      {showCountryInfo ? <IndividualCountry country={country} /> : null}
    </div>
  );
};

export default CountryNameBesideButton;
