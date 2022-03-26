const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();


const EventRegistrationSchema = new mongoose.Schema({
 title: {
    type:String,
    trim: true,
    required: true,

    
  },
  event: {
        type: mongoose.Schema.Types.ObjectId, "ref": "events",
        required: true,
        trim: true,
  },
  student: {
        type: mongoose.Schema.Types.ObjectId, "ref": "students",
        required: true,
        trim: true,
  },
  course:[ {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: false,
        trim: true,
  }],
  followDate: {
    type:String,
    
    required: true
  },
  nextDate: {
    type:String,
   
    required: true
  },
  reason: {
    type:String,
    trim: true,
    required: false,
    default:null
  },
  status: {
        type: String,
        enum : ['ENQUIRED','ENROLLED','DEMO','DENIED'],
        default: 'ENQUIRED'
  }
}, { timestamps: true, strict: true })


module.exports= { EventRegistration : db.model('event_registrations', EventRegistrationSchema), ObjectId };
