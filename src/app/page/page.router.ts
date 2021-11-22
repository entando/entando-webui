import { Router } from 'express';

export const router: Router = Router();

router.get('/page', (req, res) => {
  res.status(200).send({
    message: 'GET List All Pages'
  });
});
