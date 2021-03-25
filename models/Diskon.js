const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const diskonSchema = new mongoose.Schema({
  typeDiskon: {
    type: String,
  },
  amount: {
    type: Number,
  },
  desc: {
    type: String,
  },
  // ini trans id nya dapet ketika apa?
  transId: [{
    type: ObjectId,
    ref: 'Trans'
  }]
})

module.exports = mongoose.model("Diskon", diskonSchema);