var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: String,
  rating: Number,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
