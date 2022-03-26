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

const EventSchema = new mongoose.Schema({

  title: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The title must be unique.'],
    validate: titleValidator
  },
  branch: {
        type: mongoose.Schema.Types.ObjectId, "ref": "branch",
        required: true,
        trim: true,
        default:null
  },
  college: {
    type: mongoose.Schema.Types.ObjectId, "ref": "college",
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
  slug: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The slug must be unique.'],
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
  regType:{
        type: String,
        enum : ['FREE','PAID'],
        default: 'FREE'
  },
  regFees:{
        type: Number,
        required:false,
        default:0
  },
  seats:{
    type: Number,
    required:false,
    default:0
},
  startDate:{
        type: Date,
        required:true,
        default:Date.now
  },

  endDate:{
        type: Date,
        required:true,
        default:Date.now
  },
  type: {
        type: String,
        enum : ['WORKSHOP','SEMINAR','CODING_CHALLENGE'],
        default: 'SEMINAR'
  },
  address: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  lat: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  lng: {
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
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Event : db.model('events', EventSchema), ObjectId };
