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
    message: 'Slug must not exceed {ARGS[1]} characters.'
  })
];

const InternshipSchema = new mongoose.Schema({

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
  company: {
        type: mongoose.Schema.Types.ObjectId, "ref": "company",
        required: true,
        trim: true,
        default:null
  },
  city: {
        type: mongoose.Schema.Types.ObjectId, "ref": "cities",
        required: true,
        trim: true,
        default:null
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
    unique: [true, 'The slug must be unique.'],
    validate: slugValidator
  },
  location: {
    type:String,
    trim: true,
    required: false,
    
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
  stipend: {
    type:Number,
    trim: true,
    required: false,
    default:0
  }, 
  skills:[
      {type: mongoose.Schema.Types.ObjectId, "ref": "skills",
        required: true,
        trim: true,
        default:null
      }
  ],
  instructions: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  responsibility: {
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
  paytype: {
        type: String,
        enum : ['FREE','STIPEND','PAID'],
        required:true,
        default: 'STIPEND'
  },
  type: {
        type: String,
        enum : ['FULLTIME','PARTTIME'],
        required:true,
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
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Internship : db.model('internships', InternshipSchema), ObjectId };
