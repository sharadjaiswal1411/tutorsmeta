const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const CollegeSchema = new mongoose.Schema({

  name: {
    type:String,
    trim: true,
    required: true,
   
  },
  contact_no: {
    type:Number,
    trim: true,
    required: false,
  },
  contact_email: {
    type:String,
    trim: true,
    required: false,
  },
  contact_person: {
    type:String,
    trim: true,
    required: false,
  },
  established_in: {
    type:Date,
    trim: true,
    required: false,
  },
  affiliation: {
    type:String,
    trim: true,
    required: false,
  },
  image: {
    type:String,
    trim: true,
    required: false,
   
  },
  banner: {
    type:String,
    trim: true,
    required: false,
   
  },
  description: {
    type:String,
    trim: true,
    required: false,
  },
  address: {
    type:String,
    trim: true,
    required: false,
  },
  type: {
        type: String,
        enum : ['PRIVATE','GOVERNMENT'],
        default: 'PRIVATE'
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }

}, { timestamps: true, strict: true })



module.exports= { College : db.model('college', CollegeSchema), ObjectId };
