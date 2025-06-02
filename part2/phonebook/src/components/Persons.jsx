import React from "react";
import personService from "../services/persons";

const Persons = ({ persons, setPersons, searchValue }) => {
  function deleteAction(person) {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        console.log(`Deleting ${person.name}`);
        console.log(`Person ID: ${person.id}`);
        personService
          .remove(person.id)
          .then(() => {
            console.log(`Deleted ${person.id}`);
          })
          .catch((error) => {
            console.error(`Error deleting ${person.id}:`, error);
            alert(`Failed to delete ${person.name}. Please try again.`);
          });
        setPersons((prevPersons) =>
          prevPersons.filter((p) => p.id !== person.id)
        );
      }
    };
  }

  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchValue))
        .map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={deleteAction(person)}> Delete </button>
          </li>
        ))}
    </ul>
  );
};

export default Persons;
