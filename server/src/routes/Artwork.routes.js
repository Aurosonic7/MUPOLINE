import express from 'express';
import multer from 'multer';
import { getAllArtworks, createArtwork, updateArtwork,
  deleteArtwork,  } from '../controllers/artworkController.js';

const router = express.Router();

const storage = multer.diskStorage({ 
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => { cb(null, `${Date.now()}-${file.originalname}`); },
});

const fileFilter = (req, file, cb) => {
  console.log(`Received field: ${file.fieldname}`);
  const allowedFields = ['audio', 'image'];
  if (!allowedFields.includes(file.fieldname)) {
    return cb(new Error(`Unexpected field ${file.fieldname}`));
  }
  cb(null, true);
};


const upload = multer({ storage, fileFilter });

router.get('/', getAllArtworks);
router.post('/', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), 
(req, res, next) => {
  console.log('Files:', req.files);
  console.log('Body:', req.body);
  next();
}, createArtwork);
router.put('/:id', upload.fields([{ name: 'audio', maxCount: 1 }]), updateArtwork);
router.delete('/:id', deleteArtwork);

export default router;
