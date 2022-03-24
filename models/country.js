const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const CountrySchema = new mongoose.Schema({
    name :{type:String, required: true},
    slug :{type:String,default:null}
},{ timestamps: true, strict: true });


module.exports= { Country : db.model('country', CountrySchema), ObjectId };