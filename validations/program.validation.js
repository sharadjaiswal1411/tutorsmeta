const Joi = require('joi');

module.exports = {
create:{
	courses:Joi.string().required(),
	city:Joi.string().required(),
	title:Joi.string().required(),
	image:Joi.allow(""),
	banner:Joi.allow(""),
	description:Joi.string().allow(""),
	duration:Joi.string().required(),
	status:Joi.string().required().valid('ACTIVE','INACTIVE')


},
update:{
 	
	courses:Joi.string().required(),
	city:Joi.string().required(),
	title:Joi.string().required(),
	image:Joi.allow(""),
	banner:Joi.allow(""),
	description:Joi.string().allow(""),
	duration:Joi.string().required(),
	status:Joi.string().required().valid('ACTIVE','INACTIVE')
	
}

}