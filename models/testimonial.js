const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

//teacherId,studentId,rating,review,created_at,updated_at

const TestimonialSchema = new mongoose.Schema({
    teacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher",
        default:null
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        default:null
    },
  rating: {
    type: Number,
        enum : [1,2,3,4,5],
        default: 1
  },
  review: {
    type:String,
    trim: true,
    default:null
   
  },
  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
},
updated_at: {
    type: Date,
    default: null
}
}, { timestamps: true, strict: true })



module.exports= { Testimonial : db.model('testimonial', TestimonialSchema), ObjectId };
