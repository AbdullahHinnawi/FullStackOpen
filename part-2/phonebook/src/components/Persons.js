import React from 'react';
import IndividualPerson from './IndividualPerson';

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <IndividualPerson
            key={person.id}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default Persons;
