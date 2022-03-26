const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const AddressSchema = new mongoose.Schema({
    officeName :{type:String, required: true},
    officeAddress:{type:String, required: true},
    pincode:{type:String, default:null},
    gpsLat:{type:Number, default:0},
    gpsLng:{type:Number, default:0},
    city:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
        default:null
    }
},{ timestamps: true, strict: true });


module.exports= { Address : db.model('address', AddressSchema), ObjectId };