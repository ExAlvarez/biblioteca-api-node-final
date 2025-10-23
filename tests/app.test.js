const request = require('supertest');
const app = require('../src/app');

describe('API de Biblioteca', () => {
  it('GET /health debería responder OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('OK');
  });

  it('GET /libros debería devolver una lista', async () => {
    const res = await request(app).get('/libros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
