const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();


const ProgramSchema = new mongoose.Schema({

  courses: [{
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
  }],
  city:{
        type: mongoose.Schema.Types.ObjectId, "ref": "cities",
        required: true,
        trim: true,
  },
  title: {
    type:String,
    trim: true,
    required: true,
  
  },
  slug: {
    type:String,
    trim: true,
    unique:true,
    required: true,
  
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
    type:String,
    trim: true,
    required: false,
  },
  duration: {
    type:String,
    trim: true,
    required: true,
  },
  
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Program : db.model('programs', ProgramSchema), ObjectId };
