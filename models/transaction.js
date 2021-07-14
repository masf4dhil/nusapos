const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transactionSchema = new mongoose.Schema({
  member_Id: {
    type: ObjectId,
    ref: 'member'
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
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
    type: String,
    required: true
  },
  guarantee: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  idtransdetail: {
    type: ObjectId,
    ref: 'TransactionDetail'
  },
})

module.exports = mongoose.model("transaction", transactionSchema);
