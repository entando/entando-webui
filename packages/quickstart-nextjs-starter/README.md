# WebUI Quickstart Starter Template

This project is a template used when installing the Quickstart Entando tutorial.

At the end of the day it's an opinionated [Next.js 12](https://nextjs.org/blog/next-12) app!

It has out of the box integration with App Builder and Entando Core APIs but allows Developers to have much more control over the deployed code. **It's Low Code meets Pro Code!**

## Architecture

The WebUI project is a direct replacement of the PortalUI, present in Entando 6 and older versions.

PortalUI acted as the Entando Engine that rendered the pages that were configured through App Builder and Admin Console.

In **Entando 7**, we leverage this Architecture by bringing a new and faster engine built using Next.js 12 (the SDK for the Web!).

The WebUI Engine brings a techonology upgrade beyond limits for Entando App Developers. It not only brings a new and modern way of building Entando Apps but also allows a smooth migration path from PortalUI pages by acting as a reverse proxy to PortalUI running in headless mode (REST API only).

![WebUI Architecture using PortalUI in headless mode](assets/images/WebUI%20Architecture.png "WebUI Architecture")
_**Figure:** WebUI Architecture using PortalUI in headless mode_

## DevOps

With this new Architecture we propose a new step in the normal Entando Developer workflow experience.

Previously Developers edited pages in Draft mode and then Published them to Production. We now propose a Deploy step that bundles everything that was Published and pushes it to Production using a Build, Test & Optimize phase.

This allows Entando Developers to work in Scoped Projects and look at Entando from a DevOps perspective. Projects can be features or campaigns, for example, and allow teams to be more agile and move faster!

Also, by Introducing this new Step we allow Entando to have an Optimization phase where we leverage all features of Next.js, like [SSG, ISR or SSR](https://nextjs.org/docs/basic-features/pages) and allows Developers to implement Unit, Integration or even E2E tests in their apps, delivering faster production quality code!

![WebUI Environment Propagation Workflow](assets/images/WebUI%20Env%20Propagation.png "WebUI Environment Propagation Workflow")
_**Figure:** WebUI Environment Propagation Workflow_

## Development

This project is a normal Next.js app.

To run it all you have to do is configure the .env file with the appropriate environment variables and run:

```
yarn dev -p 5000
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
  > tests       <-- Tests folder
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