const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();

const CountrySchema = new mongoose.Schema({
    
    name :{type:String, required: true},
    iso3:{type:String,default:null},
    numeric_code:{type:String,default:null},
    iso2:{type:String,default:null},
    phonecode:{type:String,default:null},
    capital:{type:String,default:null},
    currency:{type:String,default:null},
    currency_name:{type:String,default:null},
    currency_symbol:{type:String,default:null},
    tld:{type:String,default:null},
    native:{type:String,default:null},
    region:{type:String,default:null},
    subregion:{type:String,default:null},
    timezones:{type:String,default:null},
    translations:{type:String,default:null},
    latitude:{type:String,default:null},
    longitude:{type:String,default:null},
    emoji:{type:String,default:null},
    emojiU:{type:String,default:null},
    created_at:{type:String,default:null},
    updated_at:{type:String,default:null},
    flag:{type:String,default:null},
    wikiDataId:{type:String,default:null}, 
    slug :{type:String,default:null}
},{ timestamps: true, strict: true });


module.exports= { Country : db.model('country', CountrySchema), ObjectId };


  
  

  //name,iso3,numeric_code,iso2,phonecode,capital,currency,currency_name,currency_symbol,tld,native,region,subregion,timezones,translations,latitude,longitude,emoji,emojiU,created_at,updated_at,flag,wikiDataId 