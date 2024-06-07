import express from 'express';
import upload from '../middleware/storage.js';
import { getArtworks, createArtwork, updateArtwork, deleteArtwork } from '../controllers/artworkController.js';

const router = express.Router();

router.route('/api/artworks')
  .get(getArtworks)
  .post(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), createArtwork);

router.route('/api/artworks/:id')
  .get(getArtworks)
  .put(upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), updateArtwork)
  .delete(deleteArtwork);

export default router;
