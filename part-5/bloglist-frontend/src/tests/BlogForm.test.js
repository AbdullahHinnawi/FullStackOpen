import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from '../components/BlogForm';

describe('<BlogForm />', () => {
  let component;

  const blog = {
    id: '34534534543',
    title: 'The Joel Test: 12 Steps to Better Code',
    author: 'Joel Spolsky',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/',
    likes: 3,
    user: {
      id: '2432352424',
      name: 'Abdullah Hinnawi',
      username: 'admin',
    },
  };

  const createBlog = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm createBlog={createBlog} />);
    window.localStorage.setItem('loggedInUser', JSON.stringify(blog.user));
  });

  test('updates parent state and calls onSubmit', () => {
    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');

    fireEvent.change(title, {
      target: { value: blog.title },
    });

    fireEvent.change(author, {
      target: { value: blog.author },
    });

    fireEvent.change(url, {
      target: { value: blog.url },
    });

    fireEvent.submit(form);
    //console.log('createBlog.mock.calls', createBlog.mock.calls);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
    expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
    expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
  });
});
