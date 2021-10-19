const TodoController = require('../../controllers/todo.controller')
const TodoModel = require('../../model/todo.model')
const httpMocks = require('node-mocks-http')
const newTodo = require('../mock-data/new-todo.json')

TodoModel.create = jest.fn()

let req, res, next

describe('TodoController.createTodo', () => {
  beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
    req.body = newTodo
  })

  it('should have a createTodo function', () => {
    expect(typeof TodoController.createTodo).toBe('function')
  })

  it('should call TodoModel.create', () => {
    TodoController.createTodo(req, res, next)
    expect(TodoModel.create).toBeCalledWith(newTodo)
  })

  it('should return 201 code response', async () => {
    await TodoController.createTodo(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should return json body response', async () => {
    TodoModel.create.mockReturnValue(newTodo)
    await TodoController.createTodo(req, res, next)
    expect(res._getJSONData()).toStrictEqual(newTodo)
    /**toStrictEqual: usado para fazer comparação de valores quando os valores da referência em memória são diferentes */
  })

  it('should handle errors', async () => {
    const errorMessage = { message: 'done property missing' }
    const rejectedPromise = Promise.reject(errorMessage)
    TodoModel.create.mockReturnValue(rejectedPromise)
    await TodoController.createTodo(req, res, next)
    expect(next).toBeCalledWith(errorMessage)
  })
})
