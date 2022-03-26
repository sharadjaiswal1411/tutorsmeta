const mongoose = require('mongoose');
// const { adminAuth }  = require('../../../middlewares/auth-user');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const { sendCustomError } = require('../helper/response');



const OtpSchema = new mongoose.Schema({
	phoneCode:{
		 type:String,
		 required: true,
	},
    mobileNumber:{
         type:Number,
         required: true,
    },
    
  },{ timestamps: true, strict: true })

module.exports= { Otp : db.model('otp', OtpSchema), ObjectId };
