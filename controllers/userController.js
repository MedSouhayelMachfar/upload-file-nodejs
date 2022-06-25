const upload = require("../utils/uploadFile");
const sharp = require("sharp");
const path = require("path");

// Upload image using the photo parameter
const uploadUserImage = upload.single("photo");

// Resizing user photo using the sharp package
const resizeUserPhoto = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.body.user_id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

// Upload image using the photo patameter
const uploadImage = (req, res, next) => {
  res.status(200).json({
    status: "success",
    image_name: req.file.filename,
  });
};

// Return user image
const getUserImage = function (req, res, next) {
  const filePath = `/img/users/${req.params.imagename}`;
  res.sendFile(filePath, { root: path.join(__dirname, "../public") });
};

module.exports = {
  uploadUserImage,
  uploadImage,
  getUserImage,
  resizeUserPhoto,
};
