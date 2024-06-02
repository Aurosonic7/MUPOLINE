import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb( null, './public/uploads') },
  filename: (req, file, cb) => { 
    if (file !== null) {
      const fileExt = file.originalname.split('.').pop();
      cb( null, Date.now()+'.'+fileExt );
  } }
});


const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [ 
  'image/jpg', 'image/jpeg', 'image/png', 'image/gif', 
  'audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/aac', 'audio/flac', 'audio/mp4', 'audio/x-ms-wma' 
  ];
  if ( file && allowedMimeTypes.includes(file.mimetype) ) cb(null, true); 
  else cb(null, false); 
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;