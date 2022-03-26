const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const bedtypeSchema = new mongoose.Schema({

  bed_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  bed_name: {
    type:String,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { BedType: db.model('bed_type',bedtypeSchema), ObjectId };
