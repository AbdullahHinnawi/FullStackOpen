import loginService from '../services/login';
import userService from '../services/userService';
import { setNotification } from './notificationReducer';

// fetchBlogs action creator
export const fetchUsers = () => async (dispatch) => {
  const users = await userService.getAll();
  dispatch({ type: 'FETCH_USERS', data: users });
};

// setCurrentUser action creator
export const setCurrentUser = (user) => async (dispatch) => {
  dispatch({ type: 'SET_CURRENT_USER', data: user });
};

// login action creator
export const login = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    dispatch({ type: 'LOG_USER_IN', data: user });
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.reload();
  } catch (exception) {
    console.log(`exception`, exception);
    const notification = {
      message: 'Invalid username or password',
      success: false,
      error: true,
    };
    dispatch(setNotification(notification, 5));
  }
};

export const logout = () => async (dispatch) => {
  // window.localStorage.clear()
  window.localStorage.removeItem('loggedInUser');
  window.location.reload();
  dispatch({ type: 'LOG_USER_OUT', data: null });
};

const initialState = {
  currentUser: null,
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return {
        ...state,
        users: action.data,
      };
    case 'LOG_USER_IN':
      return {
        ...state,
        currentUser: action.data,
      };
    case 'LOG_USER_OUT':
      return {
        ...state,
        currentUser: action.data,
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.data,
      };
    default:
      return state;
  }
};

export default userReducer;
