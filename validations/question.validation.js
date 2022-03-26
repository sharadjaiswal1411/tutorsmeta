const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	image:Joi.allow(""),
	option1:Joi.string().required(),
	quiz:Joi.string().required(),
	option2:Joi.string().required(),
	option3:Joi.string().required(),
	option4:Joi.string().required(),
	description:Joi.string().required(),
	correct:Joi.string().valid('option1','option2','option3','option4'),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')

},
update:{
 	title:Joi.string().required(),
	image:Joi.allow(""),
	option1:Joi.string().required(),
	quiz:Joi.string().required(),
	option2:Joi.string().required(),
	option3:Joi.string().required(),
	option4:Joi.string().required(),
	description:Joi.string().allow(""),
	correct:Joi.string().valid('option1','option2','option3','option4'),
	metaTitle:Joi.string().allow(""),
	metaDescription:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
	
	
}

}