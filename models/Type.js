const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Type", typeSchema);