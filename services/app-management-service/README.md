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
    ✓ tests create and delete a page successfully (103 ms)
    ✓ tests create a page without authorization token (3 ms)
    ✓ tests delete a page without authorization token (3 ms)
    ✓ tests create a page with invalid request (6 ms)
  User can Publish and Unpublish a Page
    ✓ tests publish and unpublish a page successfully (24 ms)
    ✓ tests update a page status without authorization token (2 ms)
    ✓ tests update a page status with invalid request (5 ms)
  User can Edit a Page
    ✓ tests create and edit a page successfully (21 ms)
    ✓ tests converting a page from 'nx' to 'legacy' type (19 ms)
    ✓ tests converting a page from 'legacy' to 'nx' type (22 ms)
    ✓ tests edit a page without authorization token (1 ms)
    ✓ tests edit a page with invalid request (2 ms)
  User can Clone a Page
    ✓ tests create and clone a page successfully (16 ms)
    ✓ tests clone a page without authorization token (2 ms)
    ✓ tests clone a page with invalid request (3 ms)

-----------------------------|---------|----------|---------|---------|-------------------------
File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------------|---------|----------|---------|---------|-------------------------
All files                    |   85.97 |    63.58 |   79.68 |   85.97 |
 src                         |   66.66 |    30.76 |      60 |   66.66 |
  index.ts                   |       0 |        0 |       0 |       0 | 1-15
  server.ts                  |   82.53 |    33.33 |      75 |   82.53 | 4-6,17-22,62-63
 src/api/page                |   91.42 |    65.38 |   81.81 |   91.42 |
  page.router.ts             |   91.42 |    65.38 |   81.81 |   91.42 | 39-43,46-48,62-63,80,92
 src/api/page/request        |    87.3 |       52 |     100 |    87.3 |
  ClonePageRequest.ts        |   73.33 |       50 |     100 |   73.33 | 3,5,13-14
  CreatePageRequest.ts       |   87.87 |    33.33 |     100 |   87.87 | 12-13,27-28
  UpdatePageRequest.ts       |     100 |      100 |     100 |     100 |
  UpdatePageStatusRequest.ts |     100 |       50 |     100 |     100 | 2-10
 src/manager                 |     100 |       80 |   66.66 |     100 |
  AppManager.ts              |     100 |       80 |   66.66 |     100 | 13
 src/manager/impl            |   98.03 |    81.81 |     100 |   98.03 |
  BaseAppManager.ts          |   98.03 |    81.81 |     100 |   98.03 | 51
 src/manager/impl/nextjs     |   86.66 |    69.23 |   71.42 |   86.66 |
  NextJsAppManager.ts        |   86.66 |    69.23 |   71.42 |   86.66 | 7,16-18
 src/middleware              |   79.78 |    65.71 |      70 |   79.78 |
  error.ts                   |    74.5 |    64.28 |    62.5 |    74.5 | 6-7,9-14,22,48-51
  keycloak.ts                |   85.18 |    54.54 |   66.66 |   85.18 | 5,10,20-21
  validator.ts               |    87.5 |       80 |   83.33 |    87.5 | 5,10
 src/utils                   |     100 |     87.5 |     100 |     100 |
  loadRouters.ts             |     100 |     87.5 |     100 |     100 | 4
-----------------------------|---------|----------|---------|---------|-------------------------
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        3.278 s, estimated 4 s
Ran all test suites.
✨  Done in 4.01s.
```
