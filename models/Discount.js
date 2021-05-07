const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const discountSchema = new mongoose.Schema({
  typeDiskon: {
    type: String,
    enum : ['Diskon','Potongan'],
    default: 'Diskon'
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  
})

module.exports = mongoose.model("Discount", discountSchema);