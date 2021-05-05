const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema({
  typeId: {
    type: ObjectId,
    ref: 'Type'
  },
  merkId: {
    type: ObjectId,
    ref: 'Merk'
  },
  product_name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
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
  barcode: {
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("Products", productSchema);