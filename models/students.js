const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const { sendCustomError } = require('../helper/response');
const bcrypt = require('bcryptjs');
const db = require('../config/database').getUserDB();

const titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const slugValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 255],
    message: 'Username must not exceed {ARGS[1]} characters.'
  })
];

const StudentSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, "ref": "user",
        required: true,
        trim: true
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId, "ref": "school",
      required: true,
      trim: true
  },
    slug: {
        type:String,
        trim: true,
        required: true,
       
      },
    firstname: {
    type:String,
    trim: true,
    required: true,
    validate: titleValidator
  },
  lastname: {
    type:String,
    trim: true,
    required: true,
    validate: titleValidator
  },
 
  phone: {
    type:Number,
    trim: true,
    required: false,
    unique: [true, 'The phone must be unique.'],
   
   
  },
  profilePic: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  gender: {
    type: String,
    enum : ['MALE','FEMALE','OTHER'],
    default: 'MALE'
},


    pincode:{type:String, default:null},
    gpsLat:{type:Number, default:0},
    gpsLng:{type:Number, default:0},
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        default:null
    },
    state:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "state",
        default:null
    },
    country:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "country",
        default:null
    },
    landmark: {
        type:String,
        trim: true,
        default:null
      },
      

  address: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  
  
  about: {
    type:String,
    //trim: true,
    default:null
  },
 
  boards:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    default:null
},
grades:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "grades",
    default:null
},
subjects:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
    default:null
},
galleryImages:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "galleryImages",
    default:null
},

    




  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
    
},
updated_at: {
    type: Date,
    default: null
},

  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })

module.exports= { Student: db.model('student', StudentSchema), ObjectId };
