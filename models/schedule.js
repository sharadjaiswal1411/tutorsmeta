const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const ScheduleSchema = new mongoose.Schema({
  title: {
    type:String,
    trim: true,
    required: true,
   
  },
  mode: {
    type:String,
    trim: true,
    required: true,
   
  },
  course: {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
  },
  location: {
    type:String,
    trim: true,
    required: true,
   
  }, 
  duration: {
    type:String,
    trim: true,
    required: true,
   
  }, 
  batchStart: {
    type:Date,
    trim: true,
    required: true,
   
  }
}, { timestamps: true, strict: true })



module.exports= { Schedule : db.model('schedules', ScheduleSchema), ObjectId };
