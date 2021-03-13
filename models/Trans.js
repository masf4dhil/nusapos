const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transSchema = new mongoose.Schema({
  productId: [{
    type: ObjectId,
    ref: 'Bookings'
  }],
  fdate: {
    type: String,
    required: true
  },
  tdate: {
    type: String,
    required: true
  },
  jaminan: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  }
 
})

module.exports = mongoose.model("Trans", transSchema);