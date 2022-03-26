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

const CategorySchema = new mongoose.Schema({

  branch: {
        type: mongoose.Schema.Types.ObjectId, "ref": "branch",
        required: true,
        trim: true,
  },
  parent: {
        type: mongoose.Schema.Types.ObjectId, "ref": "categories",
        required:false,
        default:null,
         trim: true

      
   
  },
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
  description: {
    type:String,
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



module.exports= { Category : db.model('categories', CategorySchema), ObjectId };
