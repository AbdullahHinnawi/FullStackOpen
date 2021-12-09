import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnecdotes, updateAnecdote } from '../reducers/anecdoteReducer';
import { fetchFilter } from '../reducers/filterReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchAnecdotes());
    dispatch(fetchFilter());
  }, [dispatch]);

  const vote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    dispatch(updateAnecdote(anecdote.id, updatedAnecdote));

    const message = `You voted '${anecdote.content}'`;
    dispatch(setNotification(message, 5));
  };

  return (
    <div>
      {anecdotes &&
        anecdotes
          .sort((a, b) => a.votes - b.votes)
          .reverse()
          .filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.value.toLowerCase())
          )
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Anecdotes;
