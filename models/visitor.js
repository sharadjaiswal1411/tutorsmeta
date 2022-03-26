
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const visitorSchema= new mongoose.Schema({

  hostel_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  name: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  user_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  photo: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  visitor_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
     
  check_in: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  chck_out: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  to_meet: {
    type:String,
    trim: true,
    required: true,
   
  }
}, { timestamps: true, strict: true })



module.exports= { Visitor: db.model('visitor', visitorSchema), ObjectId };
