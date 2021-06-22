var express = require("express");
var router = express.Router();
var User = require("../models/user");
var { validate } = require("../models/user");

router.get("/register", function (req, res, next) {
  res.render("users/register");
});
router.get("/login", function (req, res, next) {
  res.render("users/login");
});
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/login");
});

router.post("/login", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user)
    return res.render("users/login", {
      error: "Invalid Email or Passsword",
    });
  req.session.user = user;
  return res.redirect("/");
});
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.render("users/register", {
      error: "Email Already exists",
    });
  let { error } = validate(req.body, user);
  if (error) {
    console.log(error.details[0].message);
    return res.render("users/register", {
      error: error.details[0].message,
    });
  }

  user = new User(req.body);
  await user.save();
  res.redirect("/");
});

module.exports = router;
