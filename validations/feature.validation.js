const Joi = require('joi');
// studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
module.exports = {
create:{
     teacherId: Joi.string().required(),
     course: Joi.string(),
     classs:Joi.string(),
     avaliability:Joi.string(),
     teachingMode:Joi.string(),
     readyToTravel:Joi.string(),
     teachingMedium:Joi.string(),
     travelDistance:Joi.string(),
     created_at:Joi.date()

	 
},
update:{
     teacherId: Joi.string().required(),
     course: Joi.string(),
     classs:Joi.string(),
     avaliability:Joi.string(),
     teachingMode:Joi.string(),
     readyToTravel:Joi.string(),
     teachingMedium:Joi.string(),
     travelDistance:Joi.string(),
     created_at:Joi.date(),
     updated_at:Joi.date()
}

}