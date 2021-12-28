import blogService from '../services/blogService';
import { setNotification } from './notificationReducer';

// fetchBlogs action creator
export const fetchBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch({ type: 'FETCH_BLOGS', data: blogs });
};

export const fetchBlogById = (id) => async (dispatch) => {
  const blog = await blogService.getBlogById(id);
  console.log('blog', blog);
  dispatch({ type: 'FETCH_BLOG', data: blog });
};

// setBlogs action creator
export const setBlogs = (blogs) => async (dispatch) => {
  dispatch({ type: 'SET_BLOGS', data: blogs });
};

// setCurrentBlog action creator
export const setCurrentBlog = (blog) => async (dispatch) => {
  dispatch({ type: 'SET_CURRENT_BLOG', data: blog });
};

// createBlog action creator
export const createBlog = (blog) => async (dispatch) => {
  try {
    const savedBlog = await blogService.createBlog(blog);
    dispatch({ type: 'ADD_BLOG', data: savedBlog });

    const notification = {
      message: `A new blog ${savedBlog.title} by ${savedBlog.author} added!`,
      success: true,
      error: false,
    };
    dispatch(setNotification(notification, 5));
  } catch (error) {
    console.log('error', error);
    const notification = {
      message: `Blog title, author or url is missing!`,
      success: false,
      error: true,
    };
    dispatch(setNotification(notification, 5));
  }
};

// updateBlog action creator
export const updateBlog = (id, blog) => async (dispatch) => {
  const updatedBlog = await blogService.updateBlog(id, blog);
  dispatch({ type: 'UPDATE_BLOG', data: updatedBlog });
};

// deleteBlog action creator
export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch({ type: 'DELETE_BLOG', data: id });
};

// setCurrentBlog action creator
export const setBlogForm = (blog) => async (dispatch) => {
  dispatch({ type: 'SET_BLOG_FORM', data: blog });
};

// setCurrentBlog action creator
export const resetBlogForm = () => async (dispatch) => {
  dispatch({ type: 'RESET_BLOG_FORM' });
};

const initialBlog = {
  title: '',
  author: '',
  url: '',
};

const initialState = {
  blogForm: initialBlog,
  currentBlog: {},
  blogs: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return {
        ...state,
        blogs: action.data,
      };
    case 'FETCH_BLOG':
      return {
        ...state,
        currentBlog: action.data,
      };
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.data,
      };
    case 'SET_CURRENT_BLOG':
      return {
        ...state,
        currentBlog: action.data,
      };
    case 'ADD_BLOG':
      return {
        ...state,
        blogs: [...state.blogs, action.data],
      };
    case 'UPDATE_BLOG':
      console.log('actionData', action.data);
      return {
        ...state,
        blogs: state.blogs.map((b) =>
          b.id.toString() !== action.data.id.toString() ? b : action.data
        ),
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter((b) => b.id !== action.data),
      };
    case 'SET_BLOG_FORM':
      return {
        ...state,
        blogForm: action.data,
      };
    case 'RESET_BLOG_FORM':
      return {
        ...state,
        blogForm: initialBlog,
      };
    default:
      return state;
  }
};

export default blogReducer;
