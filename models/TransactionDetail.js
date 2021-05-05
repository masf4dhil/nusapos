const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const transactionDetailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product_Id: {
    type: ObjectId,
    ref: 'Product'
  },
  transaction_Id: {
    type: ObjectId,
    ref: 'Transaction'
  },
  discount_Id: {
    type: ObjectId,
    ref: 'Discount'
  },
  product_name: {
    type: ObjectId,
    ref: 'Discount'
  },
})

module.exports = mongoose.model("TransactionDetail", transactionDetailSchema);