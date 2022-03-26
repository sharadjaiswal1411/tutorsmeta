const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const PersonSchema = new mongoose.Schema({
    firstName :{type:String, default:null},
    lastName :{type:String, default:null},
    designation :{type:String, default:null},
    location :{type:String, default:null},
    previousCompany :{type:String, default:null},
    educationalPast :{type:String, default:null},
    professionalPast :{type:String, default:null},
    profileImage :{type:String, default:null},
    source :{type:String, default:null},
 
},{ timestamps: true, strict: true });


module.exports= { Person : db.model('person', PersonSchema), ObjectId };
