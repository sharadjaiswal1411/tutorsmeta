const Joi = require('joi');

module.exports = {
create:{
	event:Joi.string().required(),
	title:Joi.string().required(),
	student:Joi.string().required(),
	course:Joi.allow(""),
	followDate:Joi.string().required(),
	nextDate:Joi.string().required(),
	reason:Joi.string().allow(""),
	status:Joi.string().valid('ENQUIRED','ENROLLED','DEMO','DENIED')

	
},
update:{
 	event:Joi.string().required(),
 	title:Joi.string().required(),
	student:Joi.string().required(),
	course:Joi.allow(""),
	followDate:Joi.string().required(),
	nextDate:Joi.string().required(),
	reason:Joi.string().allow(""),
	status:Joi.string().valid('ENQUIRED','ENROLLED','DEMO','DENIED')
}

}