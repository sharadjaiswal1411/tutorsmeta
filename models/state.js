const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const StateSchema = new mongoose.Schema({
    
    name :{type:String, required: true},
    country_id :{
      type: mongoose.Schema.Types.ObjectId,
            ref: 'country',
            default:null},
    country_code:{type:String,default:null},
    fips_code:{type:String,default:null},
    iso2:{type:String,default:null},
    type:{type:String,default:null},
    latitude:{type:String,default:null},
    longitude:{type:String,default:null},
    created_at:{type:String,default:null},
    updated_at:{type:String,default:null},
    flag:{type:String,default:null},
    wikiDataId:{type:String,default:null}, 
    slug :{type:String,default:null}
},{ timestamps: true, strict: true });


module.exports= { State : db.model('state', StateSchema), ObjectId };


  
  

  //name,  country_id,country_code,fips_code,iso2,type,latitude,longitude,created_at,updated_at,flag,wikiDataId 

 