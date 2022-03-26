const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const SectionSchema = new mongoose.Schema({

  title: {
    type:String,
    trim: true,
    required: true,
   
  },
  description: {
    type:String,
    trim: true,
    required: false,
    default:false
  
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Section : db.model('sections', SectionSchema), ObjectId };
