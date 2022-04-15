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
  
  

  location: {
      type:String,
      trim: true,
      required: false,
    default:null
     
    },
  organization: {
    type:String,
    trim: true,
    required: false,
    default:null
   
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
    default:null
},
  startYear: {
    type:Number,
    trim: true,
    required: false,
    default:null
  },
  
  endYear: {
    type:Number,
    trim: true,
    required: false,
    default:null
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
