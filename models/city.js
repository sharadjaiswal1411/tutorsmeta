const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

//  name,description,image,status,  state_id,state_code,  country_id,country_code,latitude,longitude,created_at,updated_at,flag,wikiDataId 


const CitySchema = new mongoose.Schema({

  name: {
    type:String,
    trim: true,
    required: true,
   
  },
  slug: {
    type:String,
    trim: true,
    required: true,
   
  },
  description: {
    type:String,
    trim: true,
  },
  
  image: {
    type:String,
    trim: true,
  },
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  },
  state_id :{
    type: mongoose.Schema.Types.ObjectId,
          ref: 'state',
          default:null},
  state_code:{type:String,default:null},
  country_id :{
    type: mongoose.Schema.Types.ObjectId,
          ref: 'country',
          default:null},
  country_code:{type:String,default:null},
  latitude:{type:String,default:null},
  longitude:{type:String,default:null},
  created_at:{type:String,default:null},
  updated_at:{type:String,default:null},
  flag:{type:String,default:null},
  wikiDataId:{type:String,default:null}, 
  slug :{type:String,default:null}
}, { timestamps: true, strict: true })



module.exports= { City : db.model('cities', CitySchema), ObjectId };
