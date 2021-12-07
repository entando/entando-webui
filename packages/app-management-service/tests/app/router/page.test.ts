import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import app from '../../../src/server';
import { createMockInstance, activateMock, MockInstance, Mock, MockUser } from 'keycloak-mock';
import { CREATE_PAGE_REQUEST, CREATE_VALIDATION_ERRORS } from './__mocks__/page.mock';
import { appManager } from '../../../src/manager/AppManager';

interface KeycloakTestCache {
  keycloak?: MockInstance
  user?: MockUser
  mock?: Mock
  token?: string
}

const global: KeycloakTestCache = { };

describe('User can Create and Delete a Page', () => {
  beforeAll(async () => {
    const keycloak = await createMockInstance({
      authServerURL: 'https://myserver.com/auth',
      realm: 'entando',
      clientID: 'my-client',
      clientSecret: 'my-secret',
    });
  
    const user = keycloak.database.createUser({
      username: 'test',
      email: 'hello@hello.com',
      credentials: [{
        value: 'mypassword',
      }],
    });

    global.mock = activateMock(keycloak);
    global.token = keycloak.createBearerToken(user.profile.id);
  });

  afterAll(() => {
    global.mock?.instance.database.clear();
  });

  beforeEach(() => {
    process.env.MANAGED_APP_PATH = `/tmp/quickstart-nextjs-starter/${uuid()}`;
  });

  test('tests create a page successfully', async () => {
    await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201)
      .then((response) => {
        expect(response.body.payload).toMatchObject(CREATE_PAGE_REQUEST);
      });

    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy();
    
    //cleanup
    fs.rmdirSync(appManager.appDevPath(), { recursive: true });
  });

  test('tests create a page without authorization token', async () => {
    await supertest(app).post('/api/pages')
      .send(CREATE_PAGE_REQUEST)
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe('Access Denied');
      });

    const filename = `${appManager.appDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests create a page with invalid request', async () => {
    await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ code: 'new_page' })
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe('Validation Error');
        expect(response.body.errors).toHaveLength(8);
        expect(response.body.errors).toMatchObject(CREATE_VALIDATION_ERRORS);
      });

    const filename = `${appManager.appDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });
});
