import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';

describe('<Blog />', () => {
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

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={() => ''} deleteBlog={() => ''} />
    );
    window.localStorage.setItem('loggedInUser', JSON.stringify(blog.user));
  });

  test('renders blog title and author', () => {
    // method 1
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);

    // TAI: method 2
    const div = component.container.querySelector('.blog');
    expect(div).toHaveTextContent(blog.title);
    expect(div).toHaveTextContent(blog.author);
  });

  test('url and likes are not displayed by default', () => {
    const blogDetailsDiv = component.container.querySelector('.blogDetails');
    expect(blogDetailsDiv).toBe(null);

    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(blog.likes.toString());
  });

  test('url and likes are displayed when the view button has been clicked', () => {
    const button = component.getByText('View');
    fireEvent.click(button);

    const blogDetailsDiv = component.container.querySelector('.blogDetails');
    expect(blogDetailsDiv).toHaveTextContent(blog.url);
    expect(blogDetailsDiv).toHaveTextContent(blog.likes.toString());
  });

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('View');
    fireEvent.click(button);

    const onClickHandler = jest.fn();
    const likeButton = component.getByText('Like');
    likeButton.addEventListener('click', onClickHandler);

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    //console.log('onClickHandler.mock', onClickHandler.mock);
    expect(onClickHandler.mock.calls).toHaveLength(2);
    expect(onClickHandler).toHaveBeenCalledTimes(2);
  });
});
