const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const fooddeluxemenuSchema= new mongoose.Schema({

  foodmenu_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  foodmenu_itms: {
    type:String,
    trim: true,
    required: true,
   
  },
  
  day: {
    type:Number,
    trim: true,
    required: true,
   
  },
  price_per_day: {
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



module.exports= { Fooddeluxemenu : db.model('food_deluxemenu', fooddeluxemenuSchema), ObjectId };
