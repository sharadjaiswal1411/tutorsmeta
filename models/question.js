const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();





const QuestionSchema = new mongoose.Schema({
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
  option1: {
    type:String,
    trim: true,
    required: true,
   
  },
  option2: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  option3: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  option4: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  description: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  correct: {
        type: String,
        enum : ['option1','option2','option3','option4'],
        default: 'option1'
  },
   quiz:{
        type: mongoose.Schema.Types.ObjectId, "ref": "quizes",
        required: true,
        trim: true,
  },
  metaTitle: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
 metaDescription: {
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



module.exports= { Question : db.model('questions', QuestionSchema), ObjectId };
