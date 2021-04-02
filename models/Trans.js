const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transSchema = new mongoose.Schema({
  productId: [{
    type: ObjectId,
    ref: 'Bookings'
  }],
  memberId: {
    type: ObjectId,
    ref: 'Member'
  },
  fdate: {
    type: String,
    required: true
  },
  tdate: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  jaminan: {
    type: String,
    required: true
  },
  typeDiskon:[{
    type: String,
  }],
  diskon:[{
    type: Number,
  }],
  subtotal:[{
    type: Number,
  }],
  totalDiskon: {
    type: Number,
  },
  total: {
    type: Number,
  },
  time: {
    type: String,
    required: true
  },
  desc: [{
    type: String,
  }],
})

module.exports = mongoose.model("Trans", transSchema);