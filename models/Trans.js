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
  diskonId: [{
    type: ObjectId,
    ref: 'Diskon'
  }],
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
})

module.exports = mongoose.model("Trans", transSchema);