const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const userroleSchema = new mongoose.Schema({

  user_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
 role_name: {
    type:String,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })



module.exports= {   Userrole : db.model('user_role', userroleSchema), ObjectId };
