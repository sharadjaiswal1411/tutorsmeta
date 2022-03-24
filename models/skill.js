const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const SkillSchema = new mongoose.Schema({

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
  image: {
    type:String,
    trim: true,
    required: false,
   
  },
  description: {
    type:String,
    trim: true,
  },
   metaTitle: {
    type:String,
    trim: true,
    
    
  },
 metaDescription: {
    type:String,
    trim: true,
    
    
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Skill : db.model('skills', SkillSchema), ObjectId };
