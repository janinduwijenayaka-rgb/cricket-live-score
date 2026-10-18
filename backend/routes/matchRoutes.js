import express from 'express';
import { getMatches, getMatchById, createMatch } from '../controllers/matchController.js';

const router = express.Router();

router.route('/')
  .get(getMatches)
  .post(createMatch);

router.route('/:id')
  .get(getMatchById);

export default router;
