const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const BenefitSchema = new mongoose.Schema({
    name :{type:String, required: true},
    image :{type:String, default:null},
   
},{ timestamps: true, strict: true });


module.exports= { Benefit : db.model('benefit', BenefitSchema), ObjectId };
