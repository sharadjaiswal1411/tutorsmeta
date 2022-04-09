const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const nameValidator = [
  validate({
      validator: 'isLength',
      arguments: [0, 40],
      message: 'Name must not exceed {ARGS[1]} characters.'
  })
];




const slugValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Title must not exceed {ARGS[1]} characters.'
  })
];

const ClassSchema = new mongoose.Schema({

name: {
  type: String,
//     type:String,
// enum : ['TEACHER','STUD ENT','ADMIN'],
  required: true,
  trim: true,
  unique: [true, 'Class has already registered.'],
  validate: nameValidator
},
subcategoryId: {
    type: mongoose.Schema.Types.ObjectId, "ref": "subcategories",
    required: true,
    trim: true
},

status:{            
  type:String,  
  default:"ACTIVE"   // 0- inactive, 1- active
}, 
  slug: {
    type:String,
    trim: true,
    default:null,
    required: false,
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
  description: {
    type:String,
    trim: false,
    required: false,
    default:null
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
  }
}, { timestamps: true, strict: true })



module.exports= { Class : db.model('class', ClassSchema), ObjectId };
