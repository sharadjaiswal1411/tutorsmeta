const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const EducationSchema = new mongoose.Schema({
    teachersid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
    subjectsid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subjects",
        default:null
    },
  university: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  degreeType: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  startYear: {
    type:Number,
    trim: true,
    required: true,
   
  },
  
  endYear: {
    type:Number,
    trim: true,
    required: true,
   
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
  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
    
},
updated_at: {
    type: Date,
    default: null
},
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Education : db.model('education', EducationSchema), ObjectId };
