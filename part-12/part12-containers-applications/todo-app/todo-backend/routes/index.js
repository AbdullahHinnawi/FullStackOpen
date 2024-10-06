const express = require('express');
const router = express.Router();
const configs = require('../util/config');
const todosRouter = require('./todos');
const redis = require('../redis');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get('/statistics', async (req, res) => {
  let addedTodos = await redis.getAsync('added_todos');
  console.log('addedTodos stats', addedTodos);

  if (!addedTodos) {
    addedTodos = 0;
  }
  res.status(200).json({ added_todos: Number(addedTodos) });
});

router.use('/todos', todosRouter);

module.exports = router;
