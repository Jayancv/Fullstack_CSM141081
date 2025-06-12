import axios from 'axios';

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAllCountries = () => {
  return axios.get(`${API_URL}all`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching countries:', error);
      throw error;
    });
}

const getCountryByName =  (name) => {

    return axios.get(`${API_URL}name/${name}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching country by name (${name}):`, error);
        throw error;
      });
}



export default {
  getAllCountries,
  getCountryByName
};
