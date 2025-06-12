import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const VITE_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY


const getWeatherByCity = (city, country) => {
  return axios.get(`${WEATHER_API_URL}`, {
    params: {
      q: city + ',' + country,
      appid: VITE_WEATHER_API_KEY,
      units: 'metric',
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error(`Error fetching weather for city (${city}):`, error);
    throw error;
  });
}

const getWeatherByCoordinates = (lat, lon) => {
  return axios.get(`${WEATHER_API_URL}`, {
    params: {
      lat: lat,
      lon: lon,
      appid: VITE_WEATHER_API_KEY,
      units: 'metric',
    }
  })
  .then(response => response.data)
  .catch(error => {
    console.error(`Error fetching weather for coordinates (${lat}, ${lon}):`, error);
    throw error;
  });
}

const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export default {
  getWeatherByCity,
  getWeatherByCoordinates,
  getWeatherIconUrl
};
