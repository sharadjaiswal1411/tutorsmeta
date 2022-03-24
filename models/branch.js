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

const BranchSchema = new mongoose.Schema({
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
    unique: [true, 'The slug must be unique.'],
    validate: slugValidator
  },
  image: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  banner: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  description: {
    type:Object,
    trim: true,
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
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Branch : db.model('branch', BranchSchema), ObjectId };
