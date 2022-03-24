const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const roomdetailsSchema = new mongoose.Schema({

  room_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
 room_no: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  bed_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  hostel_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  room_type_id: {
    type:Number,
    trim: true,
    required: true,
   
  }, 
  
  bed_type_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  room_charge: {
    type:Number,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { Roomdetails : db.model('room_details', roomdetailsSchema), ObjectId };
