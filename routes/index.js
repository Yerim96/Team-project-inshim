const express = require("express");
const controller = require("../controller/index");
const router = express.Router();

//localhost:PORT/
router.get("/", controller.index);

router.get("/login", controller.Cget_login);

router.get("/register", controller.Cget_register);

module.exports = router;
