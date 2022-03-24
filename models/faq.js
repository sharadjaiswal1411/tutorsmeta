const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();


const FaqSchema = new mongoose.Schema({

  course: {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
  },
  title: {
    type:String,
    trim: true,
    required: true,
  },
  image: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  
  answer: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Faq : db.model('faqs', FaqSchema), ObjectId };
