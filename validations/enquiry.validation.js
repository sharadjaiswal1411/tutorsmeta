const Joi = require('joi');

module.exports = {
create:{
	course:Joi.string().required(),
	student:Joi.string().required(),
	followDate:Joi.date().required(),
	nextDate:Joi.date().required(),
	reason:Joi.string().allow(""),
	status:Joi.string().valid('ENQUIRED','ENROLLED','DEMO','DENIED')
	
	 
},
update:{
   course:Joi.string().required(),
	student:Joi.string().required(),
	followDate:Joi.date().required(),
	nextDate:Joi.date().required(),
	reason:Joi.string().allow(""),
	status:Joi.string().valid('ENQUIRED','ENROLLED','DEMO','DENIED')
	
}

}