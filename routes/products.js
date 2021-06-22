var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(req.session.user);
  console.log("products: ", products);
  res.render("products/list", { title: "Products", products });
});
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  console.log("Three Items in cart", cart);
  if (cart.length == 3) console.log("Three Items in cart", cart);
  res.cookie("cart", cart);
  res.redirect("/products");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect("/products");
});

router.get("/rating/:id", async function (req, res, next) {
  console.log("INSIDE RATINGS", req.params.id);
  let product = await Product.findById(req.params.id);
  console.log("INSIDE RATINGS Product", product);
  res.render("rating", { product: product });
});

router.post("/rating/add/:id", async function (req, res, next) {
  console.log("REQ BODY: ", req.body.rate);
  let product = await Product.findById(req.params.id);
  product.name = product.name;
  product.description = product.description;
  product.price = product.price;
  product.rating = req.body.rate;
  await product.save();
  console.log("REQ BODY: ", product);
  res.redirect("/products");
});

module.exports = router;
