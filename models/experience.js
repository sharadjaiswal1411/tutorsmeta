const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const ExperienceSchema = new mongoose.Schema({
    teachersId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
    designationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "designation",
        default:null
    },
    organisationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "organisation",
        default:null
    },
  
    startYear: {
        type:Number,
        trim: true,
        required: true,
       
      },
      startMonth: {
        type:Number,
        trim: true,
        required: true,
       
      },
          
  endYear: {
    type:Number,
    trim: true,
    required: true,
   
  },
        
  endMonth: {
    type:Number,
    trim: true,
    required: true,
   
  },
  location:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
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
  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
    
},
updated_at: {
    type: Date,
    default: null
},

}, { timestamps: true, strict: true })



module.exports= { Experience : db.model('experience', ExperienceSchema), ObjectId };
