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

  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "college",
    trim: true,
    required: true,
   
  },
  
  degreeType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
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



module.exports= { Education : db.model('education', EducationSchema), ObjectId };
