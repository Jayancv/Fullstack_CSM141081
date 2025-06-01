import React from 'react';

const Filter = ({ searchValue, setSearchValue }) => {
  const searchPerson = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchValue(searchTerm);
  };

  return (
    <div>
      Filter shown with <input onChange={searchPerson} value={searchValue} />
    </div>
  );
};

export default Filter;