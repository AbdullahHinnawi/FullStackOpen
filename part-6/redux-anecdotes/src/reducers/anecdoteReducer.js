import anecdoteService from '../services/anecdoteService';

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch({ type: 'INITIALIZE_ANECDOTES', data: anecdotes });
};

// fetchAnecdotes action creator
export const fetchAnecdotes = () => async (dispatch) => {
  dispatch({ type: 'FETCH_ANECDOTES' });
};

// increaseAnecdoteVotes action creator
export const updateAnecdote = (id, anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.updateAnecdote(id, anecdote);
  dispatch({ type: 'UPDATE_ANECDOTE', data: updatedAnecdote });
};

// createAnecdote action creator
export const createAnecdote = (anecdote) => async (dispatch) => {
  const savedAnecdote = await anecdoteService.createNewAnecdote(anecdote);
  dispatch({ type: 'ADD_ANECDOTE', data: savedAnecdote });
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_ANECDOTES':
      return action.data;
    case 'FETCH_ANECDOTES':
      return state;
    case 'UPDATE_ANECDOTE':
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.data
      );
    case 'ADD_ANECDOTE':
      return [...state, action.data];
    default:
      return state;
  }
};

export default anecdoteReducer;
