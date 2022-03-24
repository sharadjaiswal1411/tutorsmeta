
const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const hostelSchema= new mongoose.Schema({

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
  
  logo: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  branch: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  email: {
    type:String,
    trim: true,
    required: true,
   
  },
  
    address: {
    type:String,
    trim: true,
    required: true,
   
  },
    phone: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  state: {
    type:String,
    trim: true,
    required: true,
   
  },
  
 status: {
    type:Boolean,
    trim: true,
    required: true,
   
  },
  
  city: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  postal_code: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  zip_code: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  gallery: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  about: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  video: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  reporting_time: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  visiting_hour: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  hostl_type: {
    type:String,
    trim: true,
    required: true,
   
  }
}, { timestamps: true, strict: true })



module.exports= { Hostl: db.model('hostl', hostelSchema), ObjectId };
