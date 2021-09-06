import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personsService from './services/personsService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    personsService.getAll().then((data) => setPersons(data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const alreadyAddedPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (alreadyAddedPerson) {
      const repalcePhoneNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (repalcePhoneNumber) {
        personsService
          .update(alreadyAddedPerson.id, {
            ...alreadyAddedPerson,
            number: newNumber,
          })
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== alreadyAddedPerson.id ? person : updatedPerson
              )
            );
            setNewName('');
            setNewNumber('');
            setNotificationMessage(
              `${alreadyAddedPerson.name} phone number updated successfully!`
            );
            setSuccess(true);
            setTimeout(() => {
              setNotificationMessage(null);
              setSuccess(false);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setNotificationMessage(
              `Information of ${alreadyAddedPerson.name} has already been removed from the server`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const lastItemId = persons[persons.length - 1].id;
      const newPerson = {
        id: lastItemId + 1,
        name: newName,
        number: newNumber,
      };

      personsService.create(newPerson).then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`${newName} added successfully!`);
        setSuccess(true);
        setTimeout(() => {
          setNotificationMessage(null);
          setSuccess(false);
        }, 5000);
      });
    }
  };

  const handleDelete = (person) => {
    const deletionConfirmed = window.confirm(
      `Would you like to delete ${person.name}?`
    );
    if (deletionConfirmed) {
      personsService
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          console.log('error', error);
          alert(`Person with id ${person.id} not found!`);
        });
    }
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} success={success} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
