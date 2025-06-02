import React from "react";
import { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const addPerson = (event) => {
    event.preventDefault();

    if (newPerson.name === "") {
      alert("Name cannot be empty");
      return;
    }
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    if (!/^[\d+\-]*$/.test(newPerson.number)) {
      alert("Please enter a valid number");
      return;
    }

    const personObject = {
      name: newPerson.name,
      number: newPerson.number,
    };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        console.log("person created", returnedPerson);
        setPersons(persons.concat(returnedPerson));
        setNewPerson({ name: "", number: "" });
      })
      .catch((error) => {
        console.error("Error creating person:", error);
        alert("Failed to add person. Please try again.");
      });
  };

  const handleInputChange = (event) => {
    console.log("input changed", event.target.value);
    setNewPerson({ ...newPerson, name: event.target.value.trim() });
  };

  const handleInputChangeNumber = (event) => {
    console.log("input changed", event.target.value);
    setNewPerson({ ...newPerson, number: event.target.value.trim() });
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleInputChange} value={newPerson.name} />
      </div>
      <div>
        number:{" "}
        <input onChange={handleInputChangeNumber} value={newPerson.number} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
