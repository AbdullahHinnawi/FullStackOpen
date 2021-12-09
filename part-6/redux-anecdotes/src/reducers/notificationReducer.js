// fetchNotification action creator
export const fetchNotification = () => {
  return { type: 'FETCH_NOTIFICATION' };
};

let timeoutId = null;
// setNotification action creator
export const setNotification = (message, duration) => async (dispatch) => {
  dispatch({ type: 'SET_NOTIFICATION', data: message });
  /*
  There is no need to check if the timer/timeoutId is still running, just execute
  clearTimeout before starting the timer/new timer.
  */
  clearTimeout(timeoutId);
  console.log(`previous timer ${timeoutId} cleared`);
  timeoutId = setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
    console.log(`timer ${timeoutId} is done`);
  }, duration * 1000);
};

const initialState = {
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATION':
      return state;
    case 'SET_NOTIFICATION':
      return { ...state, message: action.data };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export default notificationReducer;
