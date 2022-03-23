import { Router, Request, Response, NextFunction } from 'express';
import { keycloak } from '../../middleware/keycloak';
import { validate } from '../../middleware/validator';
import { appManager } from '../../manager/AppManager';

import DeployAppRequest from './request/DeployAppRequest';
import { InternalServerError } from '../../error/errors';
import { handleRestError } from '../../error/handleRestError';

export const router: Router = Router();

router.post('/app/deploy',
  keycloak.protect(),
  validate(DeployAppRequest),
  async (req: Request, res: Response, next: NextFunction) => {
    const request: DeployAppRequest = req.body;
    let result;
    try {
      result = await appManager.deployApp(request.name, request.email, request.tag);
    } catch (e) {
      console.log('Error trying to schedule a deploy operation', e);
      return next(handleRestError(e));
    }    
    
    res.status(201).send({
      payload: {
        hash: result,
      }
    });
  }
);
