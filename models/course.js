const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Title must not exceed {ARGS[1]} characters.'
  })
];

const slugValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Title must not exceed {ARGS[1]} characters.'
  })
];

const CourseSchema = new mongoose.Schema({

  branch: {
        type: mongoose.Schema.Types.ObjectId, "ref": "branch",
        required: true,
        trim: true,
  },
  category: {
        type: mongoose.Schema.Types.ObjectId, "ref": "categories",
        required: true,
        trim: true,
        
  },
  instructor: {
        type: mongoose.Schema.Types.ObjectId, "ref": "instructor",
        required: true,
        trim: true,
        default:null
  },
  city:[{
        type: mongoose.Schema.Types.ObjectId, "ref": "cities",
        required: true,
        trim: true,
        default:null
  }],
  title: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The title must be unique.'],
    validate: titleValidator
  },
  slug: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The title must be unique.'],
    validate: slugValidator
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
  video: {
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
  fees: {
    type:Number,
    trim: true,
    required: true
  }, 
 certification: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
 benefits: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  schedules: [{
        type: mongoose.Schema.Types.ObjectId, "ref": "schedules",
        required: false,
        trim: true
  }],
  curriculum:{
        type: mongoose.Schema.Types.ObjectId, "ref": "curriculums",
        required: false,
        trim: true
  },
  type: {
        type: String,
        enum : ['CORE','FRAMEWORK','PROFESSIONAL'],
        required:true,
        default: 'CORE'
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
  featured: {
    type: String,
    enum : ['TRUE','FALSE'],
    default: 'FALSE'
},
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Course : db.model('courses', CourseSchema), ObjectId };
