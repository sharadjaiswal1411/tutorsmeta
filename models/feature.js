const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const FeatureSchema = new mongoose.Schema({
    teachersid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teachers",
        default:null
    },
    course:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      default:null
  },
  class:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "class",
    default:null
},
    avaliability:{         
      type: String,
      enum : ['YES','NO'],
      default: 'NO'
  
  },
    teachingMode:{         
      type: String,
      enum : ['ONLINE','OFFLINE'],
      default: 'ONLINE'
  
  },
    readyToTravel:{         
      type: String,
      enum : ['YES','NO'],
      default: 'NO'
  
  },
    teachingMedium:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
      default:null
  },
    travelDistance: {
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



module.exports= { Feature : db.model('feature', FeatureSchema), ObjectId };
