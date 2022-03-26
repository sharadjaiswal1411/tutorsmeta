const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const foodSchema = new mongoose.Schema({

    food_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      food_name: {
        type:String,
        trim: true,
        required: true,
       
      },
      
    food_category_id: {
        type:Number,
        trim: true,
        required: true,
       
      },
      
     Image: {
        type:String,
        trim: true,
        required: true,
       
      }
      }, { timestamps: true, strict: true })



module.exports= {   Food : db.model('food',  foodSchema), ObjectId };
