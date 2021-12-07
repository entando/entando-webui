# Entando WebUI Core API
This project is an internal service used to manage NxPages

# Development

## Project Structure
```
> src            -> Source Folder
> src/app        -> API Controllers
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
 PASS  build/tests/app/router/page.test.js
GET /api/page 200 1.971 ms - 39
GET /api/page 200 1.860 ms - 37
 PASS  tests/app/router/page.test.ts
-------------------------|---------|----------|---------|---------|-------------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------------|---------|----------|---------|---------|-------------------------
All files                |    73.8 |    63.33 |   78.57 |    73.8 |
 src                     |   62.06 |    52.38 |      70 |   62.06 |
  index.ts               |       0 |        0 |       0 |       0 | 1-7
  server.ts              |   70.58 |       55 |   77.77 |   70.58 | 4-7,9,12,14,20-24,35-37
 src/app/page            |     100 |      100 |     100 |     100 |
  page.router.ts         |     100 |      100 |     100 |     100 |
 src/utils               |     100 |    85.71 |     100 |     100 |
  getFilesWithKeyword.ts |     100 |    85.71 |     100 |     100 | 3
-------------------------|---------|----------|---------|---------|-------------------------

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.491 s, estimated 3 s
Ran all test suites.
✨  Done in 3.11s.
```



