const express = require("express");
const app = express();
const port = 8800;

//템플릿
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes

app.get("/", (req, res) => {
  res.render("index");
});

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
