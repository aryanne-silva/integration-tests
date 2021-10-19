const request = require('supertest')

const app = require('../../app')
const newTodo = require('../mock-data/new-todo.json')

const endpointURL = '/todos/'

describe(endpointURL, () => {
  it(`POST ${endpointURL}`, async () => {
    const response = await request(app).post(endpointURL).send(newTodo)
    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe(newTodo.title)
    expect(response.body.done).toBe(newTodo.done)
  })

  it(`should return error 500 on malformed data with POST ${endpointURL}`, async () => {
    const response = await request(app)
      .post(endpointURL)
      .send({ title: 'missing done property' })
    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({
      message: 'Todo validation failed: done: Path `done` is required.',
    })
  })
})
