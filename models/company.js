const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();
const bcrypt = require('bcryptjs');



const CompanySchema = new mongoose.Schema({
    name : {type:String, required:true,unique:true},
    email: {type:String, required:true,unique:true},
    password: {type:String, required:false,default:null},
    slug : {type:String, required:true,unique:true},
    phone: {type:Number, required:true,unique:true},
    logo : {type:String, default:null},
    shortName : {type:String, default:null},
    registeredName: {type:String, default:null},
    website:{type:String, default:null},
    facebook:{type:String, default:null},
    twitter:{type:String, default:null},
    linkedIn:{type:String, default:null},
    totalEmployees : {type:String, default:null},
    startDate:{type:String, default:null},
    followersCount:{type:Number, default:0},
    about : {type:String, default:null},
    headquatered:{type:String, default:null},
    employeesIndia:{type:String, default:null},
    featured: {
      type: String,
      enum : ['TRUE','FALSE'],
      default: 'FALSE'
  },
    headquaters:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        default:null
      },
    hqCountry:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "country",
        default:null
      },
    reviewCount:{type:Number, default:0,index:true},
    avgRating:{type:Number, default:0,index:true},
    companyType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "company_type",
        default:null
      },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
      }
    ],
    keyPersons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "person"
      }
    ],  
   benefits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "benefit"
      }
    ]
   
}, { timestamps: true, strict: true })






module.exports= { Company : db.model('company', CompanySchema), ObjectId };