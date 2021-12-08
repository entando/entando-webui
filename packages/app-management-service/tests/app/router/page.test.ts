import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import app from '../../../src/server';
import { createMockInstance, activateMock, MockInstance, Mock, MockUser } from 'keycloak-mock';
import { CREATE_PAGE_REQUEST, CREATE_PAGE_RESPONSE, CREATE_VALIDATION_ERRORS } from './__mocks__/page.mock';
import { appManager } from '../../../src/manager/AppManager';
import nock from 'nock';

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
      authServerURL: `${process.env.KEYCLOAK_URL}`,
      realm: `${process.env.KEYCLOAK_REALM}`,
      clientID: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
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

  test('tests create and delete a page successfully', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .delete(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(200, { payload: { code: CREATE_PAGE_REQUEST.code } });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_PAGE_RESPONSE);
      
    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy();
    
    // Test Delete Page
    const deleteResponse = await supertest(app).delete(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(200);
      
    expect(deleteResponse.body.payload.code).toBe(CREATE_PAGE_REQUEST.code);
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests create a page without authorization token', async () => {
    const response = await supertest(app).post('/api/pages')
      .send(CREATE_PAGE_REQUEST)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests delete a page without authorization token', async () => {
    const response = await supertest(app).delete(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests create a page with invalid request', async () => {
    const response = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ code: 'new_page' })
      .expect(400);

    expect(response.body.message).toBe('Validation Error');
    expect(response.body.errors).toHaveLength(8);
    expect(response.body.errors).toMatchObject(CREATE_VALIDATION_ERRORS);

    const filename = `${appManager.appDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });
});
