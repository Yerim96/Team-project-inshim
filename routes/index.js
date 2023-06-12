const express = require("express");
const router = express.Router();
const controller = require("../controller/index.js");

//localhost:PORT/
router.get("/", controller.index);
router.get("/userinfo", controller.route);

router.post("/userinfo", controller.detail);
router.post("/inshim/essay/write", controller.Cpostroute);

module.exports = router;