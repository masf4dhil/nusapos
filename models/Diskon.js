const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const diskonSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  amount: {
    type: Number,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
  }

})

module.exports = mongoose.model("Diskon", diskonSchema);