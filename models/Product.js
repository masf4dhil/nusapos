const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
  typeId: {
    type: ObjectId,
    ref: 'type'
  },
  merkId: {
    type: ObjectId,
    ref: 'merk'
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
    type: String,
    required: true
  },
  discount_id:[{
    type: ObjectId,
    ref: "discount"
  }]
})

module.exports = mongoose.model("product", productSchema);