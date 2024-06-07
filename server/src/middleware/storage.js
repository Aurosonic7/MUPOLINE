import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpg', 'image/jpeg', 'image/png', 'image/gif',
    'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/mp4', 'audio/x-ms-wma'
  ];
  if (file && allowedMimeTypes.includes(file.mimetype)) cb(null, true);
  else cb(null, false);
};

const upload = multer({ storage, fileFilter });

export default upload;
