const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const GallarySchema = new mongoose.Schema({
    teachersid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
  
  name: {
    type:String,
    trim: true,
    default:null
   
  },
  
  slug: {
    type:String,
    trim: true,
    required: true,
   
  },
   metaTitle: {
    type:String,
    trim: true,
    
    
  },
 metaDescription: {
    type:String,
    trim: true,
    
    
  },
  image: {
    type:String,
    trim: true,
    required: false,
    default:null
  }

}, { timestamps: true, strict: true })



module.exports= { Gallary : db.model('gallary', GallarySchema), ObjectId };
