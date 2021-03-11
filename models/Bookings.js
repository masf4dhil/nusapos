const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
  productId: {
    type: ObjectId,
    ref: 'Products'
  }
})

module.exports = mongoose.model("Bookings", bookingSchema);