import axios from "axios";

const getCountry = (country) => {
  const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`);
  return request
    .then((response) => response.data)
    .catch((error) => console.error(error.message));
};
export default { getCountry };