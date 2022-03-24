const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const CompanyTypeSchema = new mongoose.Schema({
    name :{type:String, required: true},
    slug :{type:String,default:null}
},{ timestamps: true, strict: true });


module.exports= { CompanyType : db.model('company_type', CompanyTypeSchema), ObjectId };