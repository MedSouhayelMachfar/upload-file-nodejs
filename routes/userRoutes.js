const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post(
  "/upload",
  userController.uploadUserImage,
  userController.resizeUserPhoto
);

router.get("/image/:imageName", userController.getUserImage);

module.exports = router;
