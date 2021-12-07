# WebUI Quickstart Starter Template

This project is a template used when installing the Quickstart Entando tutorial.

At the end of the day it's an opinionated [Next.js 12](https://nextjs.org/blog/next-12) app!

It has out of the box integration with App Builder and Entando Core APIs but allows Developers to have much more control over the deployed code. **It's Low Code meets Pro Code!**

Check the [Entando WebUI](https://github.com/entando/entando-webui) documentation for more details regarding the project Architecture.

## Development

This project is a normal Next.js app.

To run it you just need to configure the `.env` file with the appropriate environment variables and run:

```
yarn dev
```

**Environment Variables**
```
PORTALUI_ADDR=http://quickstart-entando.192.168.64.2.nip.io
ENTANDO_CORE_API_URL=http://quickstart-entando.192.168.64.2.nip.io/entando-de-app
NEXTAUTH_URL=http://localhost:5000
WEBUI_DEBUG=true

KEYCLOAK_URL=http://quickstart-kc-entando.192.168.64.2.nip.io/auth
KEYCLOAK_REALM=entando
KEYCLOAK_CLIENT_ID=entando-webui
KEYCLOAK_CLIENT_SECRET=my-keycloak-client-secret
```

### Project Stucture

```
> app
  > components  <-- This is where you put your custom UI Components
  > datasources <-- Want to fetch data from your Backend API, BPM Engine, Healess CMS, etc?
  > pages       <-- Next.js looks for your pages in here. Check the Next.js docs for more details
  > public      <-- Static assets folder. Ideally these would live in a CDN also.
  > tests       <-- Integration Tests folder
  package.json  <-- Project manifest
```

### Code Style

We propose a basic ESLint and Prettier configuration but feel free to edit and configure according to your own needs.

To check code style just run:
```
yarn lint
```

### Tests

We provide basic tests using Jest to demo how to assure QA best practices for your Pages and Components.

For more details check the `tests` folder.

To run all test suites and validate code coverage just run:
```
yarn test
```

This runs Jest with full coverage enabled.