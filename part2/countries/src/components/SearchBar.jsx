import React from 'react';
import countryService from '../services/countries';

const SearchBar = ({ searchTerm, setSearchTerm, setCountries , setSelectedCountry }) => {

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setSelectedCountry(null); // Reset selected country on search change
    };

  return (
    <div>
      Find countries
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
