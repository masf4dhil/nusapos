const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const diskonSchema = new mongoose.Schema({
  // type diskon ini enum 
  typeDiskon: {
    type: String,
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  
})

module.exports = mongoose.model("Diskon", diskonSchema);