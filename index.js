const express = require("express");
const app = express();
const port = 8800;

//템플릿
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use(express.static("views"));
app.use(express.static("public"));


//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
//localhost:8800/userinfo
const userinfoRouter = require("./routes");
app.use("", userinfoRouter);

//404
app.get("*", function (req, res) {
  res.render("404");
});

//port
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
