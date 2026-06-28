const multer = require('multer');

// Store files in memory so we can send the buffer to Cloudinary via stream
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Only allow image formats
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpg, jpeg, png, webp)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const uploadPdf = multer({
  storage,
  fileFilter: pdfFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = { upload, uploadPdf };

