import { useState, useEffect } from 'react'

import SearchBar from './components/SearchBar'
import CountryList from './components/CountryList'
import countryService from './services/countries'

function App() {
const [searchTerm, setSearchTerm] = useState('')
const [countries, setCountries] = useState([])
const [selectedCountry, setSelectedCountry] = useState(null);

useState(() => { 
  countryService
    .getAllCountries()
    .then((initialCountries) => {
      setCountries(initialCountries)
    })
    .catch((error) => {
      console.error('Error fetching countries:', error)
    })
}
, [])


  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setCountries={setCountries}  setSelectedCountry={setSelectedCountry} />
      <CountryList countries={countries} searchTerm={searchTerm} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </>
  )
}

export default App
