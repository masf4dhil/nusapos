const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const transSchema = new mongoose.Schema({
  productId: [{
    type: ObjectId,
    ref: 'Bookings'
  }]
})

module.exports = mongoose.model("Trans", transSchema);