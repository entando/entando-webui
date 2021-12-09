import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';
import { appManager } from '../../manager/AppManager';
import createPage from '@entando-webui/app-engine-client/src/core/pages/createPage';
import deletePage from '@entando-webui/app-engine-client/src/core/pages/deletePage';
import CreatePageRequest from './request/CreatePageRequest';
import { InternalServerError, RestError } from '../../middleware/error';

export const router: Router = Router();

router.post('/pages',
  keycloak.protect(),
  validate(CreatePageRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    let result;
    try {
      result = await createPage(req.body);
    } catch (e) {
      console.log('Error creating Entando Core Page');
      return next(handleError(e));
    }

    appManager.createPage(req.body.code);

    res.status(201).send({
      payload: result,
    });
  }
);

router.delete('/pages/:code',
  keycloak.protect(),
  async (req: Request, res: Response, next: NextFunction) => {
    let result;
    try {
      result = await deletePage(req.params.code);
    } catch (e) {
      console.log('Error deleting Entando Core Page');
      return next(handleError(e));
    }

    appManager.deletePage(req.params.code);

    res.status(200).send({
      payload: result,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (e: any): RestError => {
  return e.isAxiosError
    ? new RestError(e.response.status, e.response.statusText)
    : new InternalServerError(e.message);
};
