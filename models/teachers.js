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

const TeachersSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, "ref": "user",
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
  email: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The email must be unique.'],
    validate: slugValidator
  },
  password:{
    type: String,
    required:false,
    default:0
},
tagline: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  phone: {
    type:String,
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
  gender: {
    type: String,
    enum : ['MALE','FEMALE','OTHER'],
    default: 'MALE'
},
emailVisible: {
    type: String,
    enum : ['YES','NO'],
    default: 'NO'
},
mobileVisible: {
    type: String,
    enum : ['YES','NO'],
    default: 'NO'
},
profileVisible: {
    type: String,
    enum : ['YES','NO'],
    default: 'NO'
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
  hourlyRate: {
    type:Number,
    trim: true,
    default:0
  },
  shortBio: {
    type:String,
    //trim: true,
    default:null
  },
  about: {
    type:String,
    //trim: true,
    default:null
  },
  teachingSince: {
    type:Number,
    trim: true,
    default:0
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
    ref: "gallery",
    default:null
},
educations:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "educations",
    default:null
},
  experiences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "experiences",
    default:null
},
    certifications:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "certifications",
    default:null
},
idProofs:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "idProofs",
    default:null
},
avaliability:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "avaliability",
    default:null
},
areaServe:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "location",
    default:null
},
testimonials:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "testimonials",
    default:null
},
teachingMode:{
    type: String,
    enum : ['ONLINE','OFFLINE'],
    default: 'ONLINE'
},
teachingMedium:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "languages",
    default:null
},
readyToTravel:{
    type: String,
    enum : ['YES','NO'],
    default: 'NO'
},
travelDistance: {
    type:Number,
    trim: true,
    default:0
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
featured: {
    type:String,
    //trim: true,
    default:null
  },

  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })

TeachersSchema.methods.isValidPassword = async function(res,password) {
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports= { Teacher : db.model('teachers', TeachersSchema), ObjectId };
