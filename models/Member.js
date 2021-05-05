const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const memberSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  NoHP: {
    type: Number,
    required: true
  },
  username_ig: {
    type: String,
    required: true
  },
  identity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Member", memberSchema);