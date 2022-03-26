const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const ServiceSchema = new mongoose.Schema({

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
    unique: [true, 'The slug must be unique.']
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
  type: {
    type: String,
    enum : ['SERVICE','PAGE'],
    default: 'SERVICE'
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Service : db.model('services', ServiceSchema), ObjectId };
