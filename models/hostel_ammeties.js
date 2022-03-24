const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const hostelammitiesSchema= new mongoose.Schema({

  ammeities_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  hostel_id: {
    type:Number,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= { Hostelammeties : db.model('hostel_ammeties', hostelammitiesSchema), ObjectId };
