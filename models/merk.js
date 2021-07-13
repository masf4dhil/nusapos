const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const merkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product_id:[{
    type: ObjectId,
    ref: "product"
  }]
})

module.exports = mongoose.model("merk", merkSchema);
