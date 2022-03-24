const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const CertificationSchema = new mongoose.Schema({
    teachersid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
  name: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  duration: {
    type:String,
    trim: true,
    required: true,
   
  },
  

  
  organization: {
    type:String,
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
}
}, { timestamps: true, strict: true })



module.exports= { Certification : db.model('certification', CertificationSchema), ObjectId };
