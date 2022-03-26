const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const roomtypeSchema = new mongoose.Schema({

  type_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  type: {
    type:String,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { Roomtype: db.model('room_type',roomtypeSchema), ObjectId };
