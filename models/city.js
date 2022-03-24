const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const CitySchema = new mongoose.Schema({

  title: {
    type:String,
    trim: true,
    required: true,
   
  },
  slug: {
    type:String,
    trim: true,
    required: true,
   
  },
  description: {
    type:String,
    trim: true,
  },
  
  image: {
    type:String,
    trim: true,
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }

}, { timestamps: true, strict: true })



module.exports= { City : db.model('cities', CitySchema), ObjectId };
