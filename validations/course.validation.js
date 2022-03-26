const Joi = require('joi');

module.exports = {
create:{
	branch:Joi.string().required(),
	category:Joi.string().required(),
	instructor:Joi.string().required(),
	city:Joi.array().required(),
	title:Joi.string().required(),	
	featured:Joi.string().required().valid('TRUE', 'FALSE'),
	banner:Joi.allow(""),
	image:Joi.allow(""),
    video:Joi.allow(""),
    description:Joi.string().allow(""),
    duration:Joi.string().required(),
    fees:Joi.string().required(),
	certification:Joi.string().allow(""),
	benefits:Joi.string().allow(""),
	type:Joi.string().required().valid('CORE','FRAMEWORK','PROFESSIONAL'),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
},
update:{
	branch:Joi.string().required(),
	category:Joi.string().required(),
	instructor:Joi.string().required(),
	city:Joi.array().required(),
	title:Joi.string().required(),	
	banner:Joi.allow(""),
	image:Joi.allow(""),
    video:Joi.allow(""),
    description:Joi.string().allow(""),
	featured:Joi.string().required().valid('TRUE', 'FALSE'),
    duration:Joi.string().required(),
    fees:Joi.string().required(),
	certification:Joi.string().allow(""),
	benefits:Joi.string().allow(""),
	type:Joi.string().required().valid('CORE','FRAMEWORK','PROFESSIONAL'),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
 	
	
}

}