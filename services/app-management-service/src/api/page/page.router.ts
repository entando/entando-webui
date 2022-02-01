import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';
import { appManager } from '../../manager/AppManager';
import CreatePageRequest from './request/CreatePageRequest';
import { InternalServerError, RestError } from '../../middleware/error';
import UpdatePageStatusRequest from './request/UpdatePageStatusRequest';
import UpdatePageRequest from './request/UpdatePageRequest';

import {
  getPage,
  createPage,
  deletePage,
  updatePage,
  updatePageStatus,
  clonePage
} from '@entando-webui/app-engine-client/src/core/pages';
import ClonePageRequest from './request/ClonePageRequest';

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

    if (result.type === 'NX') {
      appManager.createPage(req.body.code);
    }

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

router.put('/pages/:code',
  keycloak.protect(),
  validate(UpdatePageRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    let result, page;
    try {
      page = await getPage(req.params.code);
      result = await updatePage(req.body);
    } catch (e) {
      console.log('Error updating Entando Core Page');
      return next(handleError(e));
    }

    // If type was changed...
    if (page.type !== result.type) {
      if (result.type === 'NX') {
        appManager.createPage(req.params.code);
      } else {
        appManager.deletePage(req.params.code);
      }
    }

    res.status(201).send({
      payload: result,
    });
  }
);

router.post('/pages/:code/clone',
  keycloak.protect(),
  validate(ClonePageRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    let result;
    try {
      result = await clonePage(req.params.code, req.body);
    } catch (e) {
      console.log('Error Cloning Entando Core Page');
      return next(handleError(e));
    }

    if (result.type === 'NX') {
      appManager.clonePage(req.params.code, req.body.newPageCode);
    }

    res.status(201).send({
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

    if (result.type === 'NX') {
      appManager.updatePageStatus(req.params.code, req.body.status);
    }

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
