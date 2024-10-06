const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const redis = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  console.log('todos', todos);
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let addedTodos = await redis.getAsync('added_todos');
  console.log('addedTodos post', addedTodos);
  if (!addedTodos) {
    addedTodos = 0;
  }
  await redis.setAsync('added_todos', Number(addedTodos) + 1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);
  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo;
  return res.status(200).json(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoId = req.todo._id;
  const body = req.body;
  const todo = {
    text: body.text,
    done: body.done,
  };
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, todo, { new: true });
    return res.status(200).json(updatedTodo);
  } catch (err) {
    console.log(`Error when updating todo with id ${todoId}`);
    console.log(err);
    return res.status(400).json(err.message);
  }
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
