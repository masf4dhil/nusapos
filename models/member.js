const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const memberSchema = new mongoose.Schema({
  no_member: {
    type: String ,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  no_hp: {
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
    type: Number,
    required: true
  },
})

module.exports = mongoose.model("member", memberSchema);
