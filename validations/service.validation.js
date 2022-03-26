const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	banner:Joi.allow(""),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	type:Joi.string().valid('SERVICE','PAGE'),
	status:Joi.string().valid('ACTIVE','INACTIVE')
	 
},
update:{
	title:Joi.string().required(),
	banner:Joi.allow(""),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	type:Joi.string().valid('SERVICE','PAGE'),
	status:Joi.string().valid('ACTIVE','INACTIVE')
    
}

}