import React from "react";
import { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, setNotification }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });

  const addPerson = (event) => {
    event.preventDefault();

    if (newPerson.name === "") {
      alert("Name cannot be empty");
      return;
    }
    if (!/^[\d+\-]*$/.test(newPerson.number)) {
      alert("Please enter a valid number");
      return;
    }
    if (persons.some((person) => person.name === newPerson.name)) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name === newPerson.name
        );
        const updatedPerson = { ...existingPerson, number: newPerson.number };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewPerson({ name: "", number: "" });
            setNotification({
              error: 0,
              message: `Updated ${returnedPerson.name}'s number`,
            });
            setTimeout(() => {
              setNotification({ error: 0, message: null });
            }, 5000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
            // alert("Failed to update person. Please try again.");
            setNotification({
              error: 1,
              message: `Information of ${existingPerson.name} has already been removed from server`,
            });
            setTimeout(() => {
              setNotification({ error: 0, message: null });
            }, 5000);
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setNewPerson({ name: "", number: "" });
          });
        return;
      }
      console.log("Person already exists, not adding again");
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
        setNotification({ error: 0, message: `Added ${returnedPerson.name}` });
        setTimeout(() => {
          setNotification({ error: 0, message: null });
        }, 5000);
      })
      .catch((error) => {
        console.error("Error creating person:", error);
        setNotification({ error: 1, message: error.response.data.error });
        setTimeout(() => {
          setNotification({ error: 0, message: null });
        }, 5000);
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
