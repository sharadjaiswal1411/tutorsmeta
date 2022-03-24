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
  name: {
    type:String,
    trim: true,
    required: true,
    validate: titleValidator
  },
  username: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The username must be unique.'],
    validate: slugValidator
  },
  email: {
    type:String,
    trim: true,
    required: true,
    unique: [true, 'The email must be unique.'],
   
  },
  password:{
    type: String,
    required:false,
    default:0
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
    required: false,
    default:null
  },
  experience: {
    type:String,
    trim: true,
    required: [true,'experience is require in number'],
    default:0
   
  },

  college: {
        type: mongoose.Schema.Types.ObjectId, "ref": "college",
        required: true,
        trim: true,
        default:null
  },
  about: {
    type:String,
    trim: true,
    required: false,
    default:null
  },

  courses: [{
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: false,
        trim: true,
        default:null
  }],
  joiningDate:{
        type: Date,
        required:[true,'joiningDate is require in Date'],
        default:Date.now
  },

  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })

StudentSchema.methods.isValidPassword = async function(res,password) {
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports= { Student : db.model('students', StudentSchema), ObjectId };
