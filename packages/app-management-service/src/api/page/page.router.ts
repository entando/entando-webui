import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';
import { appManager } from '../../manager/AppManager';
import createPage from '@entando-webui/app-engine-client/src/core/pages/createPage';
import deletePage from '@entando-webui/app-engine-client/src/core/pages/deletePage';
import updatePageStatus from '@entando-webui/app-engine-client/src/core/pages/updatePageStatus';
import CreatePageRequest from './request/CreatePageRequest';
import { InternalServerError, RestError } from '../../middleware/error';
import UpdatePageStatusRequest from './request/UpdatePageStatusRequest';

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

router.put('/pages/:code/status',
  keycloak.protect(),
  validate(UpdatePageStatusRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    let result;
    try {
      result = await updatePageStatus(req.params.code, req.body);
    } catch (e) {
      console.log('Error updating Entando Core Page Status');
      return next(handleError(e));
    }

    appManager.updatePageStatus(req.params.code, req.body.status);

    res.status(201).send({
      payload: result,
    });
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleError = (e: any): RestError => {
  return e.isAxiosError
    ? new RestError(e.response.status, e.response.statusText, e.response.data.errors)
    : new InternalServerError(e.message);
};
