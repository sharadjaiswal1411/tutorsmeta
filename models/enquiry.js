const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const EnquirySchema = new mongoose.Schema({
  course: {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
  },
  student: {
        type: mongoose.Schema.Types.ObjectId, "ref": "students",
        required: true,
        trim: true,
  },
  followDate: {
    type:Date,
    default:Date.now,
    required: true
  },
  nextDate: {
    type:Date,
    default:Date.now,
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



module.exports= { Enquiry : db.model('enquiries', EnquirySchema), ObjectId };
