const mongoose = require('mongoose');
const ObjectId = mongoose.Schema;
const productSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    required: true
  },
  merk: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  barcode: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("product", productSchema);