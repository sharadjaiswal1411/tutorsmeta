const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const GradesSchema = new mongoose.Schema({
    boards:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "boards",
        default:null
    },
  name: {
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
  fee: {
    type:Number,
    trim: true,
    default:0
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



module.exports= { Grades : db.model('grades', GradesSchema), ObjectId };
