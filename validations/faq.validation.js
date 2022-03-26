const Joi = require('joi');

module.exports = {
create:{
	course:Joi.string().required(),
	title:Joi.string().required(),
	image:Joi.allow(""),
	answer:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
	
	
},
update:{
 	course:Joi.string().required(),
	title:Joi.string().required(),
	image:Joi.allow(""),
	answer:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
	
	
}

}