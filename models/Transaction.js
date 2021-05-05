const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  member_Id: {
    type: ObjectId,
    ref: 'Member'
  },
  total_product: {
    type: Number,
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  total_discount: {
    type: Number,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  invoice: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  note: {
    type: String,
  },
})

module.exports = mongoose.model("Transaction", transactionSchema);