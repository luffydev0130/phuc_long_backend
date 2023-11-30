const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../', '../', '../', 'public', 'uploads')); // Specify the directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original filename
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const mimeType = file.mimetype.split('/')[0];
    if (!allowedMimeTypes.includes(mimeType)) {
      return cb(new Error('Invalid file format'));
    }
    cb(null, true);
  },
});

const uploadFilesUtils = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = uploadFilesUtils;
