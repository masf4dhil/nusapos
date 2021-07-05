const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const discountSchema = new mongoose.Schema({
  typeDiskon: {
    // enum : ['Diskon','Potongan'],
    // default: 'Diskon'
    type: String,
    required: true
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

module.exports = mongoose.model("discount", discountSchema);