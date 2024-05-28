import {
  getArtwork,
  procedureRegisterArtwork,
  procedureDeleteArtwork,
  uploadArtwork,
  getArtworks
} from '../controllers/artworkController.js';
import multer from 'multer';

import { Router } from 'express';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.route('/').get(getArtwork);
router.route('/register').post(procedureRegisterArtwork);
router.route('/:id').delete(procedureDeleteArtwork);

router.post('/upload', upload.single('image'), uploadArtwork);
router.get('/:id', getArtworks);

export default router;