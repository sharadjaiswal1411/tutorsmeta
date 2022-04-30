const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const { sendCustomError } = require('../helper/response');
const bcrypt = require('bcryptjs');
const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 40],
        message: 'Name must not exceed {ARGS[1]} characters.'
    })
];

const emailValidator = [
    validate({
        validator: 'isLength',
        arguments: [0, 60],
        message: 'Email must not exceed {ARGS[1]} characters.'
    }),
    validate({
        validator: 'isEmail',
        message: 'Email must be valid.'
    })
];

//userid,slug,about,board,school,college,subcategory,cityId,created_at,updated_at,status

const StudentSchema = new mongoose.Schema({

  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',//teacher,organization,student
    default:null
 },
 slug: {
    type:String,
    trim: true,
    required: false
   
  },
  about: {
    type:String,
    //trim: true,
    default:null
  },
  boardId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',//teacher,organization,student
    default:null
 },
 schoolId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'school',//teacher,organization,student
    default:null
 },
 collegeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'college',//teacher,organization,student
    default:null
 },
 subcategoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subcategory',//teacher,organization,student
    default:null
 },
    //first
    // name: {
    //     type: String,
    //     ////////////required:[true, 'Name is ////////////required.'],
    //     trim: true,
    //     validate: nameValidator,
    //     default:null
    // },
    // lastname: {
    //     type: String,
    //   //   ////////////required:[true, 'Name is ////////////required.'],
    //     trim: true,
    //     validate: nameValidator,
    //     default:null
    // },
    // email: {
    //     type: String,
    //      ////////////required: [true, 'Email is ////////////required.'],
    //     unique: [true, 'Email has already registered.'],
    //     validate: emailValidator,
    //     trim: true,
    //     default:null
    // }, 

    // password: {
    //     type: String,
    //     trim: true,
    //     ////////////required: [true, 'Password is ////////////required.'],
    //     default:null
    // },
   
    // phoneCode: {
    //     type: String,
    //     trim: true,
    //     ////////////required:[true, 'phoneCode is ////////////required.'],
    //     default:null
    // },
    // mobileNumber: {
    //     type: Number,
    //     trim: true,
    //     ////////////required:[true, 'mobileNumber is ////////////required.'],
    //     default:null
    // }, 
    // gender: {
    //     type: String,
    //     enum : ['MALE','FEMALE','OTHER'],
    //     default: 'MALE'
    // },
    // image: {
    //     type: String,
    //     trim: true , 
    //     default:null
    // },
    cityId: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'studentAddress',
         default:null,
        trim: true  
    },

    status:{            
    //     type: Boolean,    // 0- inactive, 1- active, 2- deleted
    //     default:false,
    //     ////////////required:[true, 'status is ////////////required.'],
    //
    type: String,
    enum : ['ACTIVE','INACTIVE'],
    default: 'INACTIVE'

},
    // deviceType: {
    //     type: String, // WEB/ ANDROID/ IOS
    //     ////////////////required: [false, 'deviceType is //////////////required.'],
    //     trim: true,
    // },
    // deviceToken: {
    //     type: String,
    //     default:null,
    //     trim: true,
    // },
    // accessToken: {
    //     type: String,
    //     trim: true,
    //     default: null
    // },
    // resetToken: {
    //         type: String,
    //         trim: true,
    //         default: null
    // },
    created_at: {
        type: Date,
       // //////////////required:[true,'joiningDate is require in Date'],
        default:Date.now,
        default: null
        
    },
    updated_at: {
        type: Date,
        default: null
    },
    // roleId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'role',//teacher,organization,student
    //     default:null
    //  },
    //  categories:[
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'category',
    //         default:null
    //      }

    //  ]
}, { timestamps: true, strict: true })


StudentSchema.methods.isValidPassword = async function(res,password) {
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports= { Student : db.model('student', StudentSchema), ObjectId };
