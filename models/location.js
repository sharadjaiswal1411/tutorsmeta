const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const LocationSchema = new mongoose.Schema({
    name :{type:String, required: true},
    slug: {
        type:String,
        trim: true,
        required: true,
       
      },
    pincode:{type:String, default:null},
    gpsLat:{type:Number, default:0},
    gpsLng:{type:Number, default:0},
    cityId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        default:null
    }
},{ timestamps: true, strict: true });


module.exports= { Location : db.model('location', LocationSchema), ObjectId };