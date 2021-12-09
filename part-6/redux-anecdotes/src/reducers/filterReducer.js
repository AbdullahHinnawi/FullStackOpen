// fetchFilter action creator
export const fetchFilter = () => {
  return { type: 'FETCH_FILTER' };
};

// setFilter action creator
export const setFilter = (filter) => {
  return { type: 'SET_FILTER', data: filter };
};

// resetFilter action creator
export const resetFilter = () => {
  return { type: 'RESET_FILTER' };
};

const initialState = {
  value: '',
};

const filterReducer = (state = initialState, action) => {
  //console.log('state now: ', state);
  //console.log('action', action);

  switch (action.type) {
    case 'FETCH_FILTER':
      return state;
    case 'SET_FILTER':
      return { ...state, value: action.data };
    case 'RESET_FILTER':
      return initialState;
    default:
      return state;
  }
};

export default filterReducer;
