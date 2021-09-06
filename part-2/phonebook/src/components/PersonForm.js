import React from 'react';

const PersonForm = (props) => {
  const {
    newName,
    handleNewNameChange,
    newNumber,
    handleNewNumberChange,
    handleSubmit,
  } = props;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
