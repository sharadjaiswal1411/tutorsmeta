const Joi = require('joi');
// studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
module.exports = {
create:{
     teacherId: Joi.string().required(),
    location: Joi.string(),
    organization:Joi.string(),
    course:Joi.string(),
    startYear:Joi.string(),
    endYear:Joi.string(),
     created_at:Joi.date()

	 
},
update:{
     teacherId: Joi.string().required(),
     location: Joi.string(),
     organization:Joi.string(),
     course:Joi.string(),
     startYear:Joi.string(),
     endYear:Joi.string(),
     created_at:Joi.date(),
     updated_at:Joi.date()
}

}