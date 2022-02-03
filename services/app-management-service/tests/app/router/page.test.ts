import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import nock from 'nock';
import axios from 'axios';
import { createMockInstance, activateMock, MockInstance, Mock, MockUser } from 'keycloak-mock';

import app from '../../../src/server';
import { appManager } from '../../../src/manager/AppManager';
import { IUpdatePageStatusRequest } from '@entando-webui/app-engine-client';

import {
  CLONE_PAGE_REQUEST,
  CLONE_PAGE_RESPONSE,
  CREATE_PAGE_REQUEST,
  CREATE_NX_PAGE_RESPONSE,
  CREATE_VALIDATION_ERRORS,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_RESPONSE,
  UPDATE_STATUS_VALIDATION_ERRORS_EMPTY_BODY,
  UPDATE_STATUS_VALIDATION_ERRORS_INVALID_STATUS,
  UPDATE_TO_LEGACY_PAGE_RESPONSE,
  UPDATE_TO_NX_PAGE_RESPONSE,
  UPDATE_VALIDATION_ERRORS,
  CREATE_LEGACY_PAGE_RESPONSE,
  CLONE_VALIDATION_ERRORS
} from './__mocks__/page.mock';

interface KeycloakTestCache {
  keycloak?: MockInstance
  user?: MockUser
  mock?: Mock
  token?: string
}

const global: KeycloakTestCache = { };

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
  fs.mkdirSync(process.env.MANAGED_APP_PATH, { recursive: true });
});

afterEach(() => {
  nock.cleanAll();
  fs.rmSync(appManager.appPath(), { recursive: true });
});

describe('User can Create and Delete a Page', () => {
  test('tests create and delete a page successfully', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .delete(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(200, { payload: { code: CREATE_PAGE_REQUEST.code } });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_NX_PAGE_RESPONSE);
      
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

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests delete a page without authorization token', async () => {
    const response = await supertest(app).delete(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests create a page with invalid request', async () => {
    const response = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ /* empty */})
      .expect(400);

    expect(response.body.message).toBe('Validation Error');
    expect(response.body.errors).toHaveLength(CREATE_VALIDATION_ERRORS.length);
    expect(response.body.errors).toMatchObject(CREATE_VALIDATION_ERRORS);

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });
});

describe('User can Publish and Unpublish a Page', () => {
  test('tests publish and unpublish a page successfully', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });
    
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .persist()
      .put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .reply(201, (_uri: string, requestBody: IUpdatePageStatusRequest) => {
        return { payload: {
          ...CREATE_NX_PAGE_RESPONSE,
          status: requestBody.status === 'draft'
            ? 'unpublished'
            : 'published'
        }};
      });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_NX_PAGE_RESPONSE);
      
    const draftFilename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    const publishFilename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.published.page.tsx`;
    expect(fs.existsSync(draftFilename)).toBeTruthy();
    expect(fs.existsSync(publishFilename)).toBeFalsy();
    
    // Test Publish Page
    const publishResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ status: 'published' })
      .expect(201);
      
    expect(publishResponse.body.payload.code).toBe(CREATE_PAGE_REQUEST.code);
    expect(publishResponse.body.payload.status).toBe('published');
    expect(fs.existsSync(draftFilename)).toBeTruthy();
    expect(fs.existsSync(publishFilename)).toBeTruthy();

    // Test Unpublish Page
    const unpublishResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ status: 'draft' })
      .expect(201);
      
    expect(unpublishResponse.body.payload.code).toBe(CREATE_PAGE_REQUEST.code);
    expect(unpublishResponse.body.payload.status).toBe('unpublished');
    expect(fs.existsSync(draftFilename)).toBeTruthy();
    expect(fs.existsSync(publishFilename)).toBeFalsy();
  });

  test('tests update a page status without authorization token', async () => {
    const response = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .send({ status: 'published' })
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.published.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests update a page status with invalid request', async () => {
    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.published.page.tsx`;

    const firstResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ status: 'invalid' })
      .expect(400);

    expect(firstResponse.body.message).toBe('Validation Error');
    expect(firstResponse.body.errors).toHaveLength(UPDATE_STATUS_VALIDATION_ERRORS_INVALID_STATUS.length);
    expect(firstResponse.body.errors).toMatchObject(UPDATE_STATUS_VALIDATION_ERRORS_INVALID_STATUS);

    expect(fs.existsSync(filename)).toBeFalsy();

    const secondResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}/status`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ /* empty body */ })
      .expect(400);

    expect(secondResponse.body.message).toBe('Validation Error');
    expect(secondResponse.body.errors).toHaveLength(UPDATE_STATUS_VALIDATION_ERRORS_EMPTY_BODY.length);
    expect(secondResponse.body.errors).toMatchObject(UPDATE_STATUS_VALIDATION_ERRORS_EMPTY_BODY);

    expect(fs.existsSync(filename)).toBeFalsy();
  });
});

describe('User can Edit a Page', () => {
  test('tests create and edit a page successfully', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .get(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: UPDATE_PAGE_RESPONSE });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_NX_PAGE_RESPONSE);
      
    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy();

    // Test Edit Page
    const updateResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(UPDATE_PAGE_REQUEST)
      .expect(201);
      
    expect(updateResponse.body.payload).toMatchObject(UPDATE_PAGE_RESPONSE);
    expect(fs.existsSync(filename)).toBeTruthy();
  });

  test('tests converting a page from \'nx\' to \'legacy\' type', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .get(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: UPDATE_TO_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: UPDATE_TO_LEGACY_PAGE_RESPONSE });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_NX_PAGE_RESPONSE);
      
    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy();

    // Test Edit Page
    const updateResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(UPDATE_PAGE_REQUEST)
      .expect(201);
      
    expect(updateResponse.body.payload).toMatchObject(UPDATE_TO_LEGACY_PAGE_RESPONSE);
    expect(fs.existsSync(filename)).toBeFalsy(); // page was removed
  });

  test('tests converting a page from \'legacy\' to \'nx\' type', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_LEGACY_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .get(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: CREATE_LEGACY_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .reply(201, { payload: UPDATE_TO_NX_PAGE_RESPONSE });

    // Test Create Legacy Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_LEGACY_PAGE_RESPONSE);
      
    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();

    // Test Edit Page
    const updateResponse = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(UPDATE_PAGE_REQUEST)
      .expect(201);
      
    expect(updateResponse.body.payload).toMatchObject(UPDATE_TO_NX_PAGE_RESPONSE);
    expect(fs.existsSync(filename)).toBeTruthy(); // page was created
  });

  test('tests edit a page without authorization token', async () => {
    const response = await supertest(app).put(`/api/pages/${CREATE_PAGE_REQUEST.code}`)
      .send(UPDATE_PAGE_REQUEST)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests edit a page with invalid request', async () => {
    const response = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ /* empty */})
      .expect(400);

    expect(response.body.message).toBe('Validation Error');
    expect(response.body.errors).toHaveLength(UPDATE_VALIDATION_ERRORS.length);
    expect(response.body.errors).toMatchObject(UPDATE_VALIDATION_ERRORS);

    const filename = `${appManager.appPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });
});

describe('User can Clone a Page', () => {
  test('tests create and clone a page successfully', async () => {
    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post('/api/pages')
      .reply(201, { payload: CREATE_NX_PAGE_RESPONSE });

    nock(`${process.env.ENTANDO_CORE_API_URL}`)
      .post(`/api/pages/${CREATE_PAGE_REQUEST.code}/clone`)
      .reply(201, { payload: CLONE_PAGE_RESPONSE });

    // Test Create Page
    const createResponse = await supertest(app).post('/api/pages')
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CREATE_PAGE_REQUEST)
      .expect(201);
      
    expect(createResponse.body.payload).toMatchObject(CREATE_NX_PAGE_RESPONSE);
      
    const filename = `${appManager.pagesDevPath()}/${CREATE_PAGE_REQUEST.code}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy();

    // Test Clone Page
    const cloneResponse = await supertest(app).post(`/api/pages/${CREATE_PAGE_REQUEST.code}/clone`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send(CLONE_PAGE_REQUEST)
      .expect(201);
      
    expect(cloneResponse.body.payload).toMatchObject(CLONE_PAGE_RESPONSE);
      
    const cloneFilename = `${appManager.pagesDevPath()}/${CLONE_PAGE_REQUEST.newPageCode}.page.tsx`;
    expect(fs.existsSync(filename)).toBeTruthy(); // original exists
    expect(fs.existsSync(cloneFilename)).toBeTruthy(); //cloned exists
  });

  test('tests clone a page without authorization token', async () => {
    const response = await supertest(app).post(`/api/pages/${CREATE_PAGE_REQUEST.code}/clone`)
      .send(CLONE_PAGE_REQUEST)
      .expect(403);

    expect(response.body.message).toBe('Access Denied');

    const filename = `${appManager.appPath()}/${CLONE_PAGE_REQUEST.newPageCode}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });

  test('tests clone a page with invalid request', async () => {
    const response = await supertest(app).post(`/api/pages/${CREATE_PAGE_REQUEST.code}/clone`)
      .set({ 'Authorization': `Bearer ${global.token}` })
      .send({ /* empty body */ })
      .expect(400);

    expect(response.body.message).toBe('Validation Error');
    expect(response.body.errors).toHaveLength(CLONE_VALIDATION_ERRORS.length);
    expect(response.body.errors).toMatchObject(CLONE_VALIDATION_ERRORS);

    const filename = `${appManager.appPath()}/${CLONE_PAGE_REQUEST.newPageCode}.page.tsx`;
    expect(fs.existsSync(filename)).toBeFalsy();
  });
});
