const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const foodorderSchema = new mongoose.Schema({

    hostel_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      food_order_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      
    user_id: {
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
      
         
      food_order: {
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
      date_time: {
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



module.exports= {   Foodorder: db.model('food_order',  foodorderSchema), ObjectId };
