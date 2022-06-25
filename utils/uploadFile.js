const multer = require("multer");

// Set up destination and filename for as a multerStorage
/* const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    // user-id-timestamp.jpeg
    const ext = file.mimetype.split("/")[1];
    const image_name = `user-${req.body.user_id}-${Date.now()}.${ext}`;
    cb(null, image_name);
    req.savedimage = image_name;
  },
}); */
const multerStorage = multer.memoryStorage();

// Allow only image file
const multerFilter = (req, file, cb) => {
  if (file && file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please provide a valid image !"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
