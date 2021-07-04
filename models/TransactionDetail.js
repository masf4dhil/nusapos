const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const transactionDetailSchema = new mongoose.Schema({
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
    ref: 'Transaction'
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

module.exports = mongoose.model("TransactionDetail", transactionDetailSchema);