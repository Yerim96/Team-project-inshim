const express = require("express");
const controller = require("../controller/user");
const router = express.Router();

router.post("/login", controller.Cpost_login);

router.post("/register", controller.Cpost_register);

router.post("/register/checkUserId", controller.Cpost_checkUserId);

module.exports = router;
