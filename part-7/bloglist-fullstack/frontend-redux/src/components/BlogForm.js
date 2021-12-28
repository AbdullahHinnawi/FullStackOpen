import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setBlogForm,
  createBlog,
  resetBlogForm,
} from '../reducers/blogReducer';
import Togglable from './Togglable';
import { Button, Form } from 'react-bootstrap';

const BlogForm = () => {
  const blogForm = useSelector((state) => state.blog.blogForm);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const addBlog = (event) => {
    // @ts-ignore
    blogFormRef.current.toggleVisibility();
    event.preventDefault();
    dispatch(createBlog(blogForm));
    dispatch(resetBlogForm());
  };

  return (
    <>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <Form onSubmit={addBlog} style={{ width: 400 }}>
          <Form.Group className="mb-1" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={blogForm.title || ''}
              name="Title"
              onChange={(e) =>
                dispatch(setBlogForm({ ...blogForm, title: e.target.value }))
              }
              size="sm"
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={blogForm.author || ''}
              name="Author"
              onChange={(e) =>
                dispatch(setBlogForm({ ...blogForm, author: e.target.value }))
              }
              size="sm"
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="password">
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              value={blogForm.url || ''}
              name="url"
              onChange={(e) =>
                dispatch(setBlogForm({ ...blogForm, url: e.target.value }))
              }
              size="sm"
            />
          </Form.Group>

          <Button type="submit" id="createBtn" size="sm">
            Create
          </Button>
        </Form>
      </Togglable>
    </>
  );
};

export default BlogForm;
