import {
  getArtwork,
  procedureRegisterArtwork,
  procedureDeleteArtwork
} from '../controllers/artworkController.js';

import { Router } from 'express';

const router = Router();

router.route('/').get(getArtwork);
router.route('/register').post(procedureRegisterArtwork);
router.route('/:id').delete(procedureDeleteArtwork);

export default router;