# App Management Service
This is a Microservice used to manage NxApps (Next Generation Apps).

At this moment we only support Next.js Apps but the idea is to support other kind of Frameworks in the Future.

# Development

## Project Structure
```
> src            -> Source Folder
> src/api        -> API Controllers
> src/utils      -> Utils functions
> tests          -> Unit and Integration Tests
> coverage       -> Jest coverage report is generated here
> build          -> Typescript build folder
> dist           -> Minified packages folder
> package.json   -> App Manifest
```

## Run
Run app in development mode using default port `8080`
```
yarn dev
```

## Build
To build this package and run it in production we use [trace-pkg](https://github.com/FormidableLabs/trace-pkg) to optimize the generated files.

```
$ yarn build
$ yarn start -p 8080
```

> Note: Current package size is `470KB` zipped and `1.7MB` unzipped.

## Lint
Lint and code style validation:

```
yarn lint
```

## Test
This project uses `Jest` to run test suites.

```
yarn test
```

### Coverage Report
Check `coverage` folder for more details.

```
 PASS  tests/app/router/page.test.ts
  User can Create and Delete a Page
    ✓ tests create a page successfully (43 ms)
    ✓ tests create a page without authorization token (4 ms)
    ✓ tests create a page with invalid request (3 ms)

-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------
All files                |   83.06 |    71.05 |   81.81 |   83.06 |
 src                     |    58.2 |    33.33 |      60 |    58.2 |
  index.ts               |       0 |        0 |       0 |       0 | 1-15
  server.ts              |      75 |    36.36 |      75 |      75 | 4-6,8,12,18-25
 src/api/page            |   72.72 |       75 |   57.14 |   72.72 |
  page.router.ts         |   72.72 |       75 |   57.14 |   72.72 | 7,9-12,22
 src/api/page/request    |      75 |     37.5 |     100 |      75 |
  CreatePageRequest.ts   |      75 |     37.5 |     100 |      75 | 9-10,18-21,30-31
 src/manager             |     100 |       75 |     100 |     100 |
  AppManager.ts          |     100 |       75 |     100 |     100 | 12
 src/manager/impl        |     100 |    85.71 |     100 |     100 |
  BaseAppManager.ts      |     100 |    85.71 |     100 |     100 | 6
 src/manager/impl/nextjs |     100 |      100 |     100 |     100 |
  NextJsAppManager.ts    |     100 |      100 |     100 |     100 |
 src/middleware          |   90.47 |    83.33 |   82.35 |   90.47 |
  error.ts               |   85.45 |     87.5 |   71.42 |   85.45 | 18-21,34,52-54
  keycloak.ts            |     100 |    83.33 |     100 |     100 | 2
  validator.ts           |    87.5 |       80 |   83.33 |    87.5 | 5,10
 src/utils               |     100 |    85.71 |     100 |     100 |
  loadRouters.ts         |     100 |    85.71 |     100 |     100 | 4
-------------------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        3.169 s, estimated 4 s
Ran all test suites.
✨  Done in 3.76s.
```



