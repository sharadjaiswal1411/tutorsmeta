const Joi = require('joi');
// studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
module.exports = {
create:{
     teacherId: Joi.string().required(),
     idname: Joi.string(),
     idnumber: Joi.string(),
     idimage:Joi.string(),
     description:Joi.string(),
     created_at:Joi.date()

	 
},
update:{
     teacherId: Joi.string().required(),
     idname: Joi.string(),
     idnumber: Joi.string(),
     idimage:Joi.string(),
     created_at:Joi.date(),
     updated_at:Joi.date()
}

}