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

const slugValidator = [
    validate({
      validator: 'isLength',
      arguments: [0, 255],
      message: 'Username must not exceed {ARGS[1]} characters.'
    })
  ];

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
    //     type:String,
    // enum : ['TEACHER','STUDENT','ADMIN'],
        required: true,
        trim: true,
        unique: [true, 'Subject has already registered.'],
        validate: nameValidator
    },
    
    status:{            
        type: String,
    enum : ['ACTIVE','INACTIVE'],
    default: 'INACTIVE'
// 0- inactive, 1- active
    },
    slug:{
        type:String,
        trim: true,
        required: false,
        unique: [true, 'Subject has already registered.'],
        validate: slugValidator
    }


},{ timestamps: true, strict: true })

module.exports= { Subject : db.model('subject', SubjectSchema), ObjectId };