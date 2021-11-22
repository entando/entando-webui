import supertest from 'supertest';
import app from '../../../src/server';

describe('User can List, Create and Delete a Page', () => {
  test('tests list all pages', async () => {
    await supertest(app).get('/api/page')
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe('GET List All Pages');
      });
  });
});