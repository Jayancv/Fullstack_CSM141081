import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [notification, setNotification] = useState({ error: 0, message: null });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification error={notification.error} message={notification.message} />
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />

      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setNotification={setNotification}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        searchValue={searchValue}
      />
    </div>
  );
};

export default App;
