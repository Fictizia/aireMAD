const request = require('supertest');
const app = require('../index')

describe('GET / endpoint', () => {
  test('Should respond with a Hello world', () => request(app)
  .get('/')
  .expect('Content-Type', /json/)
  //.expect('Content-Length', '15')
  .expect(200)
  .then(({body}) => {
    expect(body.message).toBe('Hello World!')
  }))
})
