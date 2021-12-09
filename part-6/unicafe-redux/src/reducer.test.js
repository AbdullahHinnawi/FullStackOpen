import deepFreeze from 'deep-freeze';
import counterReducer from './reducer';

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test('should return a proper initial state when called with undefined state', () => {
    const state = undefined;
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = counterReducer(state, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test('zero returns the initial state', () => {
    const action = {
      type: 'ZERO',
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });

  test('should return current state when called with undefined action type', () => {
    const currentState = {
      good: 3,
      ok: 4,
      bad: 2,
    };
    const action = {
      type: '',
    };

    const newState = counterReducer(currentState, action);
    expect(newState).toEqual(currentState);
  });
});
