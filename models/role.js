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

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
    //     type:String,
    // enum : ['TEACHER','STUDENT','ADMIN'],
        required: true,
        trim: true,
        unique: [true, 'Role has already registered.'],
        validate: nameValidator
    },
    status:{            
        type:Boolean,  
        default:false        // 0- inactive, 1- active
    },

},{ timestamps: true, strict: true })

module.exports= { Role : db.model('role', RoleSchema), ObjectId };