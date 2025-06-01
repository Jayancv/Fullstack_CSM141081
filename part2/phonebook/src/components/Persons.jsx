import React from 'react';

const Persons = ({ persons, searchValue }) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(searchValue))
        .map(person => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

export default Persons;