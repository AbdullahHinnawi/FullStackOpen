import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      )
      .then((response) => {
        console.log('response', response);
        setWeather(response.data);
      })
      .catch((error) => console.log(error));
  }, [city]);

  return (
    <div>
      <h3>Weather in {city}</h3>
      {weather ? (
        <div>
          <p>
            <b>Temperature: </b>
            {weather.current.temperature} Celcius
          </p>
          {weather.current.weather_icons.map((icon) => (
            <img key={icon} src={icon} alt="icon" width={100} />
          ))}
          <p>
            <b>Wind: </b>
            {weather.current.wind_speed} mph Direction{' '}
            {weather.current.wind_dir}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
