const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const QuizSchema = new mongoose.Schema({

  course: {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId, "ref": "branch",
    required: true,
    trim: true,
},
  category: {
        type: mongoose.Schema.Types.ObjectId, "ref": "categories",
        required: true,
        trim: true,
        default:null
  },
  instructor: {
        type: mongoose.Schema.Types.ObjectId, "ref": "instructor",
        required: true,
        trim: true,
        default:null
  },

  title: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The title must be unique.'],
    
  },
  slug: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The title must be unique.'],
  },
  banner: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  image: {
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
  duration: {
    type:String,
    trim: true,
    required: true
  },
  
  questions: [{
        type: mongoose.Schema.Types.ObjectId, "ref": "questions",
        required: false,
        trim: true
  }],
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



module.exports= { Quiz : db.model('quizes', QuizSchema), ObjectId };
