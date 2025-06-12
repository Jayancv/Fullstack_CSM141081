import { useState, useEffect } from 'react'
import weatherService from "../services/weather";

const CountryWeather = ({ capital, capitalInfo }) => {

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (capital && capitalInfo) {
      weatherService
        .getWeatherByCoordinates(capitalInfo.latlng[0], capitalInfo.latlng[1])
        .then((data) => {
          setWeatherData({
            temp: data.main.temp,
            wind: data.wind.speed,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          });
        });
    }
  }, [capital, capitalInfo]);

  return (
    <div>

      <h3>Weather in {capital}</h3>
      <p>Temperature: {weatherData?.temp} Celsius</p>
      <img
        src={weatherData?.iconUrl}
        alt={`Weather icon for ${capital}`}
        width="50"
      />
      <p>Wind: {weatherData?.wind} m/s</p>
  </div>
);
}
export default CountryWeather;