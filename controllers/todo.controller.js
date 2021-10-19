const TodoModel = require('../model/todo.model')

/*
 *req: what the client is passing in to rest api
 *res: what is used to send the response
 *next: something is used kinda middleware
 */
exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body)
    res.status(201).json(createdModel)
  } catch (error) {
    next(error)
  }
}
