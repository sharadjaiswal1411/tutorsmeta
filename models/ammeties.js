const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const ObjectId = mongoose.Types.ObjectId;
const db = require('../config/database').getUserDB();


const Joi = require('@hapi/joi');
mongoose.connect("mongodb://localhost:27017/hostel",
{ 
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:true,
    // useUnifiedTopology:true
})
.then(()=>console.log("connection successfully..."))
.catch((err)=>console.log(err));


const ammetiesSchema = new mongoose.Schema({

  ammeties_id: {
    type:Number,
    trim: true,
    required: true,
   
  },
  name: {
    type:String,
    trim: true,
    required: true,
   
  }

}, { timestamps: true, strict: true })














// conn

const Ammeties=new mongoose.model("ammeties",ammetiesSchema);
















// module.exports= { Ammeties : db.model('ammeties', ammetiesSchema), ObjectId };
