const multer = require('multer');
const { v4: uuid4 } = require('uuid');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, uuid4() + '--' + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

module.exports = upload;
