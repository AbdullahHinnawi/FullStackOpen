import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.anecdote.value,
      votes: 0,
    };
    event.target.anecdote.value = '';
    props.createAnecdote(newAnecdote);

    const message = `You created '${newAnecdote.content}'`;
    props.setNotification(message, 5);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" style={{ marginBottom: 10 }} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

// Since the component does not need to access the store's state, we
// can simply pass null as the first parameter to connect function.
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
