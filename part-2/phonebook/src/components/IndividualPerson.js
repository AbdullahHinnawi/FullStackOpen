import React from 'react';

const IndividualPerson = ({ person, handleDelete }) => {
  return (
    <>
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person)} style={{ marginLeft: 10 }}>
          Delete
        </button>
      </p>
    </>
  );
};

export default IndividualPerson;
