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

const IdproofSchema = new mongoose.Schema({

  teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher',//teacher,organization,student
    default:null
 },
idname: {
        type: String,
        trim: true , 
        default:null
    },
idnumber: {
        type: String,
        trim: true , 
        default:null
    },
    idimage: {
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



module.exports= { Idproof : db.model('idproof', IdproofSchema), ObjectId };
