const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();



const MembershipSchema = new mongoose.Schema({

  name: {
    type:String,
    trim: true,
    required: true,
   
  },
  price:{
    type:String,
    trim: true,
    required: false,

  },
  slug: {
    type:String,
    trim: true,
    required: false,
   
  },
  image: {
    type:String,
    trim: true,
    required: false,
   
  },
  description: {
    type:String,
    trim: true,
  },
   metaTitle: {
    type:String,
    trim: true,
    
    
  },
 metaDescription: {
    type:String,
    trim: true,
    
    
  },
  created_at: {
    type: Date,
    required:[true,'joiningDate is require in Date'],
    default:Date.now
    
},
updated_at: {
    type: Date,
    default: null
},
  status: {
        type: String,
        enum : ['ACTIVE','INACTIVE'],
        default: 'INACTIVE'
  }
}, { timestamps: true, strict: true })



module.exports= { Membership : db.model('membership', MembershipSchema), ObjectId };
