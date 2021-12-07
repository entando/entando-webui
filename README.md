# Entando WebUI

> This project is still in closed Beta. Proceed at your own risk!
> 
> Reach out at [developers@entando.com](developers@entando.com) if you need any help.

This project is a monorepo that contains all apps and packages used in the WebUI Architecture in Entando 7.

The WebUI project is an _**optional**_ direct replacement of the PortalUI, which was the renderization engine used in Entando 6 and older versions.

At the end of the day it's an opinionated [Next.js 12](https://nextjs.org/blog/next-12) app with out of the box integrations with everything you build inside [App Builder](https://dev.entando.org/v6.3.2/docs/concepts/#entando-app-builder).

It not only supports all pre-existing features but now supports more modern Web Frameworks and gives Developers full control over the deployed code. **It's Low Code meets Pro Code!**

## Architecture

PortalUI acted as the Entando Engine that rendered the pages that were configured through App Builder and Admin Console.

In **Entando 7**, we leverage this Architecture by bringing a new and faster engine built using Next.js 12 (the SDK for the Web!).

The WebUI Engine brings a techonology upgrade beyond limits for Entando App Developers. It not only brings a new and modern way of building Entando Apps but also allows a smooth migration path from PortalUI pages by acting as a reverse proxy to PortalUI running in headless mode (REST API only).

![WebUI Architecture using PortalUI in headless mode](./assets/images/WebUI%20Architecture.png "WebUI Architecture")
_**Figure:** WebUI Architecture using PortalUI in headless mode_

## DevOps

With this new Architecture we propose a new step in the normal Entando User workflow experience.

Previously Users edited pages in Draft mode and then Published them to Production. We now propose a Deploy step that bundles everything that was Published and pushes it to Production during a Build, Test & Optimize phase.

This allows Entando Users to work in Scoped Projects and look at Entando from a DevOps perspective. Projects can be features or campaigns, for example, and allow teams to be more agile and move faster!

Also, by Introducing this new Step we allow Entando to have an Optimization phase where we leverage all features of Next.js, like [SSG, ISR or SSR](https://nextjs.org/docs/basic-features/pages) and allows Developers to implement Unit, Integration or even E2E tests in their apps, delivering high quality apps to production!

![WebUI Environment Propagation Workflow](assets/images/WebUI%20Env%20Propagation.png "WebUI Environment Propagation Workflow")
_**Figure:** WebUI Environment Propagation Workflow_

## Development

This project is a monorepo managed using Yarn Workspaces and contains all Libraries, Microservices, UI Components and Next.js Starter Applications used in this new Architecture.

We provide a simple way to bootstrap a Development Environment using `yarn dev` but feel free to add or propose your own scripts. Check the [package.json](https://github.com/entando/entando-webui/blob/master/package.json) for more details.

### Environment Variables

Before starting configure the `.env` files inside the following sub projects:
 - [packages/app-management-service](https://github.com/entando/entando-webui/blob/master/packages/app-management-service)
 - [starters/quickstart-nextjs-starter](https://github.com/entando/entando-webui/blob/master/starters/quickstart-nextjs-starter)

### Project Stucture

```
> packages
 > app-engine-client         <-- Client integrations with Keycloak and Entando Core APIs
 > app-management-service    <-- Microservice used to Manage Entando Apps
> starters                   <-- Starter Templates used in Demos
 > quickstart-nextjs-starter <-- Example Starter Template used in the Quickstart Tutorial
package.json                 <-- Project manifest
```
