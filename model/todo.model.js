/**
 * Mongoose provides a straight-forward, schema-based solution to model your application data.
 * It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
 * https://mongoosejs.com/
 */

const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
})

const todoModel = mongoose.model('Todo', TodoSchema)

module.exports = todoModel
