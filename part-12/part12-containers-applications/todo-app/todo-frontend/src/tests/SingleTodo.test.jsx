// src/tests/SingleTodo.test.jsx
import { render, screen } from '@testing-library/react';
import SingleTodo from './../Todos/SingleTodo'; // Adjust path as necessary
import React from 'react'

describe('SingleTodo Component', () => {
  const todoDone = {
    text: 'Learn React Testing',
    done: true,
  };

  const todoNotDone = {
    text: 'Learn React Testing',
    done: false,
  };

  const doneInfo = <span data-testid="done-info">This todo is done</span>;
  const notDoneInfo = <span data-testid="not-done-info">This todo is not done</span>;

  it('renders the todo text correctly', () => {
    render(<SingleTodo todo={todoDone} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />);
    const todoText = screen.getByText(/learn react testing/i);
    expect(todoText).toBeInTheDocument(); // Now expect should work
  });

  it('renders done info when todo is done', () => {
    render(<SingleTodo todo={todoDone} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />);
    const doneInfoElement = screen.getByTestId('done-info');
    expect(doneInfoElement).toBeInTheDocument();
  });

  it('renders not done info when todo is not done', () => {
    render(<SingleTodo todo={todoNotDone} doneInfo={doneInfo} notDoneInfo={notDoneInfo} />);
    const notDoneInfoElement = screen.getByTestId('not-done-info');
    expect(notDoneInfoElement).toBeInTheDocument();
  });
});
