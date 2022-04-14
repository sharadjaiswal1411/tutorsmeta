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

//studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at

const TeacherAddressSchema = new mongoose.Schema({

  teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',//teacher,organization,student
    default:null
 },
    address: {
        type: String,
        trim: true , 
        default:null
    },
    pincode: {
        type: String,
        trim: true , 
        default:null
    },
    gpsLat: {
        type: String,
        trim: true , 
        default:null
    },
    gpsLng: {
        type: String,
        trim: true , 
        default:null
    },
    cityId: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'city',
         default:null,
        trim: true  
    },
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'state',
        default:null,
       trim: true  
   },
   countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'country',
    default:null,
   trim: true  
},
landmark: {
    type: String,
    trim: true , 
    default:null
},
    created_at: {
        type: Date,
       // //////////////required:[true,'joiningDate is require in Date'],
        default:Date.now,
        default: null
        
    },
    updated_at: {
        type: Date,
        default: null
    }
}, { timestamps: true, strict: true })


TeacherAddressSchema.methods.isValidPassword = async function(res,password) {
    try {
        return bcrypt.compare(password,this.password);
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
}

module.exports= { TeacherAddress : db.model('teacherAddress', TeacherAddressSchema), ObjectId };
