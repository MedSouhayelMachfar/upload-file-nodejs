const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post(
  "/upload",
  userController.uploadUserImage,
  userController.resizeUserPhoto,
  userController.uploadImage
);

router.get("/image/:imagename", userController.getUserImage);

module.exports = router;
