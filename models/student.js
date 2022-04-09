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



const StudentSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',//teacher,organization,student
    default:null
 },
    //first
    name: {
        type: String,
        required:[true, 'Name is required.'],
        trim: true,
        validate: nameValidator,
        default:null
    },
    // lastname: {
    //     type: String,
    //   //   required:[true, 'Name is required.'],
    //     trim: true,
    //     validate: nameValidator,
    //     default:null
    // },
    email: {
        type: String,
         required: [true, 'Email is required.'],
        unique: [true, 'Email has already registered.'],
        validate: emailValidator,
        trim: true
    }, 

    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required.'],
    },
   
    phoneCode: {
        type: String,
        trim: true,
        required:[true, 'phoneCode is required.'],
    },
    mobileNumber: {
        type: Number,
        trim: true,
        required:[true, 'mobileNumber is required.'],

    }, 
    gender: {
        type: String,
        enum : ['MALE','FEMALE','OTHER'],
        default: 'MALE'
    },
    image: {
        type: String,
        trim: true , 
        default:null
    },
    cityId: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'city',
        trim: true  
    },

    status:{            
    //     type: Boolean,    // 0- inactive, 1- active, 2- deleted
    //     default:false,
    //     required:[true, 'status is required.'],
    //
    type: String,
    enum : ['ACTIVE','INACTIVE'],
    default: 'INACTIVE'

},
    deviceType: {
        type: String, // WEB/ ANDROID/ IOS
        required: [true, 'deviceType is required.'],
        trim: true,
    },
    deviceToken: {
        type: String,
        default:null,
        trim: true,
    },
    accessToken: {
        type: String,
        trim: true,
        default: null
    },
    resetToken: {
            type: String,
            trim: true,
            default: null
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
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',//teacher,organization,student
        default:null
     },
     categories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            default:null
         }

     ]
}, { timestamps: true, strict: true })


StudentSchema.methods.isValidPassword = async function(res,password) {
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports= { Student : db.model('student', StudentSchema), ObjectId };
