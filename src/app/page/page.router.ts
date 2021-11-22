import { Router } from 'express';

export const router: Router = Router();

const BASE_PATH = process.env.BASE_PATH || '/api';

router.get(`${BASE_PATH}/page`, (req, res) => {
  res.status(200).send({
    message: 'GET List All Pages'
  });
});
