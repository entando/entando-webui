import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { keycloak } from './middleware/keycloak';
import { loadRouters } from './utils/loadRouters';
import errorHandler, { NotFoundError } from './middleware/error';

const app: Express = express();

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/

app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle logs in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(cors());
}

// Handle security and origin in production
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Handle keycloak authorization
app.use(keycloak.middleware());

/************************************************************************************
 *                               Register all routes
 ***********************************************************************************/
loadRouters(__dirname + '/api')
  .forEach(router => {
    app.use('/api', router);
  });

// Fallback route
app.use('*', () => {
  throw new NotFoundError();
});

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/

app.use(errorHandler);

export default app;
