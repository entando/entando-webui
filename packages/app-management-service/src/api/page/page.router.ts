import { Router, Request, Response } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';
import CreatePageRequest from './request/CreatePageRequest';
import { appManager } from '../../manager/AppManager';

export const router: Router = Router();

router.post('/pages',
  keycloak.protect(),
  validate(CreatePageRequest),
  (req: Request, res: Response) => {
    const pageRequest: CreatePageRequest = req.body;
    //TODO call entando core to create the page using pageRequest
    appManager.createPage(pageRequest.code);

    res.status(201).send({
      payload: pageRequest,
    });
  });
