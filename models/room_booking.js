const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const roombookingdSchema = new mongoose.Schema({

    hostel_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      booking_id: {
        type:String,
        trim: true,
        required: true,
       
      },
      
    room_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      
      payment_method: {
        type:String,
        trim: true,
        required: true,
       
      },
      
      total_balance: {
        type:Number,
        trim: true,
        required: true,
       
      },
      
         
      check_in: {
        type:String,
        trim: true,
        required: true,
       
      },
      
      chck_out: {
        type:String,
        trim: true,
        required: true,
       
      },
      
      due: {
        type:String,
        trim: true,
        required: true,
       
      },
      status: {
        type:String,
        trim: true,
        required: true,
       
      },
      paid: {
        type:String,
        trim: true,
        required: true,
       
      },
      date: {
        type:String,
        trim: true,
        required: true,
       
      },
      month: {
        type:String,
        trim: true,
        required: true,
       
      }

}, { timestamps: true, strict: true })



module.exports= {   Roombooking : db.model('room_details',  roombookingdSchema), ObjectId };
