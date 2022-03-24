const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const roomfacilitiesSchma= new mongoose.Schema({

  facilities_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  name_id: {
    type:Number,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { RoomFacilities : db.model('room_facilities', roomfacilitiesSchma), ObjectId };
