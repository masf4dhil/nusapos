const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const transaction_detailSchema = new mongoose.Schema({
  product_Id:[{
    type: ObjectId,
    ref: 'product'
  }],
  discountId:[{
    type: ObjectId,
    ref: 'discount'
  }],
  transaction_Id: [{
    type: ObjectId,
    ref: 'transaction'
  }],
  product_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  note: {
    type: String,
  },
})

module.exports = mongoose.model("transaction_detail", transaction_detailSchema);