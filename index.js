const express = require("express");
const app = express();
const port = 8800;
const cookieParser = require("cookie-parser");
const session = require("express-session");

//템플릿
app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use(express.static("public"));

//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    key: "sid",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24000 * 60 * 60,
    },
  })
);

//routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/", userRouter);

app.get("*", function (req, res) {
  res.render("404");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
