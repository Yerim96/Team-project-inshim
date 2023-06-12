const express = require("express");
const controller = require("../controller/route");
const router = express.Router();


router.get("/userinfo", controller.route);

router.post("/userinfo", controller.detail);
router.post("/inshim/essay/write", controller.Cpostroute);

module.exports = router;
