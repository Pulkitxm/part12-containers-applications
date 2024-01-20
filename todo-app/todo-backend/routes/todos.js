const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET todos listing by id. */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id)
  res.send(todo);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

/* Update todo to listing. */
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  const todo = await Todo.findById(id);
  const updatedTodo = await Todo.findByIdAndUpdate(id, {
    text: text!=undefined ? text : todo.text,
    done: done!=undefined ? done : todo.done
  }, {
   new:true 
  });
  res.send(updatedTodo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
