const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const facilitiesSchma = new mongoose.Schema({

  facilities_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  name: {
    type:String,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { Facilities : db.model('facilities', facilitiesSchma), ObjectId };
