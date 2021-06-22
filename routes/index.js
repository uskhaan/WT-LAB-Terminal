var express = require("express");
var router = express.Router();
var Product = require("../models/product");

router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  console.log("products: ", products);
  res.render("products/list", { title: "Store", products });
});


router.get("/cart", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  res.render("cart", { cart });
});

module.exports = router;
