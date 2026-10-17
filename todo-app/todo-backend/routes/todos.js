const express = require('express')
const mongoose = require('mongoose')
const { Todo } = require('../mongo')
const { get, set } = require('../redis')

const router = express.Router()

router.get('/', async (req, res) => {
  const todos = await Todo.find({})
  res.json(todos)
})

router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const currentCount = await get('added_todos')
  const nextCount = Number(currentCount || 0) + 1
  await set('added_todos', String(nextCount))

  res.json(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.sendStatus(404)
  }

  const todo = await Todo.findById(id)

  if (!todo) {
    return res.sendStatus(404)
  }

  req.todo = todo
  next()
}

singleRouter.get('/', async (req, res) => {
  res.json(req.todo)
})

singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body || {}

  if (text !== undefined) {
    if (typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'invalid text' })
    }
    req.todo.text = text
  }

  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: 'invalid done value' })
    }
    req.todo.done = done
  }

  await req.todo.save()
  res.json(req.todo)
})

singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()
  res.sendStatus(200)
})

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router