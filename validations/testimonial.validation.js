const Joi = require('joi');
// teacherId,studentId,rating,review,created_at,updated_at
module.exports = {
create:{
     teacherId: Joi.string().required(),
     studentId: Joi.string().required(),
     rating: Joi.number(),
     review: Joi.string().required(),
     created_at:Joi.date()
	 
},
update:{
     teacherId: Joi.string().required(),
     studentId: Joi.string().required(),
     rating: Joi.number(),
     review: Joi.string().required(),
     created_at:Joi.date(),
     updated_at:Joi.date()
	
}

}