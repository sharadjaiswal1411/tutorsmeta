const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

//teacherId,studentId,rating,review,created_at,updated_at

const LanguageSchema = new mongoose.Schema({
  name: {
    type:String,
    trim: true,
    default:null
   
  }
}, { timestamps: true, strict: true })



module.exports= { Language : db.model('language', LanguageSchema), ObjectId };
