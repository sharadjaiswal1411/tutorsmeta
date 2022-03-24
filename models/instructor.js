const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcryptjs');
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
    message: 'Username must not exceed {ARGS[1]} characters.'
  })
];

const InstructorSchema = new mongoose.Schema({
  name: {
    type:String,
    trim: true,
    required: true,
    validate: titleValidator
  },
  
  email: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The email must be unique.'],
   
  },
  
  phone: {
    type:Number,
    trim: true,
    required: false,
    unique: [true, 'The phone must be unique.'],
   
   
  },
  image: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  address: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  salary: {
    type:Number,
    trim: true,
    required: true,
   
  },
  designation: {
    type:String,
    trim: true,
    required: true,
   
  },
 experience : {
    type:Number,
    trim: true,
    required: true,
   
  },

  about: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  employementType: {
        type: String,
        enum : ['FULLTIME','PARTTIME','HOURLY'],
        default: 'FULLTIME'
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



module.exports= { Instructor : db.model('instructor', InstructorSchema), ObjectId };
