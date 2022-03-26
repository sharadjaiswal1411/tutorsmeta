const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const CurriculumSchema = new mongoose.Schema({

  title: {
    type:String,
    trim: true,
    required: true,
   
  },
  sections: [{
        type: mongoose.Schema.Types.ObjectId, "ref": "sections",
        required: false,
        default:0
  }],
  course: {
        type: mongoose.Schema.Types.ObjectId, "ref": "courses",
        required: true,
        trim: true,
       
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Curriculum : db.model('curriculums', CurriculumSchema), ObjectId };
