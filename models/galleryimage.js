const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const GalleryimageSchema = new mongoose.Schema({
    teachersid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
    name: {
      type:String,
      trim: true,
      default:null
     
    },
    image: {
      type:String,
      trim: true,
      default:null
     
    },
    description: {
      type:String,
      trim: true,
      default:null
     
    },

  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
    
},
updated_at: {
    type: Date,
    default: null
}
}, { timestamps: true, strict: true })



module.exports= { Galleryimage : db.model('galleryimage', GalleryimageSchema), ObjectId };
