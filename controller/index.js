exports.index = (req, res) => {
  res.render("index");
  console.log(req.session);
};

exports.Cget_login = (req, res) => {
  res.render("login");
  console.log(req.session);
};

exports.Cget_register = (req, res) => {
  res.render("register");
};

///
exports.Cget_intro = (req, res) => {
  res.render("intro");
};
///
