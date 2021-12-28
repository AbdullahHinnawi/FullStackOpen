import React, { useEffect, useState } from 'react';
import {
  updateBlog,
  deleteBlog,
  fetchBlogById,
  setCurrentBlog,
} from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const blogId = useParams().id;
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const currentBlog = useSelector((state) => state.blog.currentBlog);

  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchBlogById(blogId));
  }, [dispatch, blogId]);

  const handleLikeClick = () => {
    const updatedBlogObject = {
      ...currentBlog,
      likes: currentBlog.likes + 1,
    };
    dispatch(updateBlog(updatedBlogObject.id, updatedBlogObject));
    dispatch(setCurrentBlog(updatedBlogObject));
  };

  const handleDelete = () => {
    const deletionConfirmed = window.confirm(
      `Delete blog you are not gonna need it by ${currentBlog.author}?`
    );
    if (deletionConfirmed) {
      dispatch(deleteBlog(currentBlog.id));
      history.push('/');
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    const updatedBlogObject = {
      ...currentBlog,
      comments: [...currentBlog.comments, comment],
    };
    dispatch(updateBlog(updatedBlogObject.id, updatedBlogObject));
    dispatch(setCurrentBlog(updatedBlogObject));
    setComment('');
  };

  if (!currentBlog) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ margin: 10 }}>
      <h2>
        {currentBlog.title} by {currentBlog.author}
      </h2>
      <div className="blogDetails">
        <div>
          <a href={currentBlog.url} rel="noreferrer" target="_blank">
            {currentBlog.url}
          </a>
          <br />
          likes {currentBlog.likes}{' '}
          <Button
            variant="primary"
            onClick={handleLikeClick}
            style={buttonStyle}
            size="sm"
          >
            Like
          </Button>
        </div>
        <div>
          Added by {currentBlog.user ? currentBlog.user.name : null}
          <br />
          {currentBlog.user &&
          loggedInUser.username === currentBlog.user.username ? (
            <Button
              variant="danger"
              onClick={handleDelete}
              id="add-comment-button"
              style={{ marginTop: 5 }}
              size="sm"
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
      <br />
      <div>
        <h3>Comments</h3>
        <Form onSubmit={handleAddComment} style={{ width: 400 }}>
          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              value={comment}
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              size="sm"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            id="add-comment-button"
            size="sm"
          >
            Add comment
          </Button>
        </Form>
        <br />
        <div>
          <ul>
            {currentBlog.comments
              ? currentBlog.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))
              : 'No comments!'}
          </ul>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  marginLeft: 5,
};

export default Blog;
