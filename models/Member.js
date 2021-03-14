const mongoose = require('mongoose');
const  { ObjectId } = mongoose.Schema;
const memberSchema = new mongoose.Schema({
  transId: [{
    type: ObjectId,
    ref: 'Trans'
  }],
  No_Member: {
    type: String,
    required: true
  },
  NIK: {
    type: Number,
    required: true
  },
  NoHP: {
    type: Number,
    required: true
  },
  Instagram: {
    type: String,
    required: true
  },
  Nama_EKTP: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },

 
  
})

module.exports = mongoose.model("Member", memberSchema);