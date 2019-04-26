const request = require('supertest');
const server = require('../../index.js');
const db = require('../../data/dbConfig.js');

let token;

beforeAll(async () => {
  const res = await request(server)
      .post('/users/register')
      .send({ 
          username: 'username',
          password: 'password'
      });
});

describe('Category router handler', () => {
  beforeEach( async () => {
    const res = await request(server)
    .post('/users/login')
    .send({ username: 'username', password: 'password' });
    token = res.body.token;
  });

  afterEach( async () => {
    await db('category').truncate();
  });

  describe('GET /', () => {
    it('responds with status code 200', async () => {
      await request(server)
        .post('/users/category')
        .set('Authorization', token)
        .send({ title: 'Test Title' });
      const res = await request(server).get('/users/category');
      expect(res.status).toBe(200);
    });
  });  
});