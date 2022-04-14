const Joi = require('joi');
// studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
module.exports = {
create:{
     teacherId: Joi.string().required(),
     address: Joi.string(),
     pincode: Joi.string(),
     gpsLat: Joi.string(),
     gpsLng: Joi.string(),
     cityId: Joi.string(),
     state: Joi.string(),
     country: Joi.string(),
     landmark: Joi.string(),
     created_at:Joi.date()

	 
},
update:{
     teacherId: Joi.string().required(),
     address: Joi.string(),
     pincode: Joi.string(),
     gpsLat: Joi.string(),
     gpsLng: Joi.string(),
     cityId: Joi.string(),
     state: Joi.string(),
     country: Joi.string(),
     landmark: Joi.string(),
     created_at:Joi.date(),
     updated_at:Joi.date()
}

}