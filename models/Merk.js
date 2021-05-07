const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const merkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Merk", merkSchema);