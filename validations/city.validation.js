const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	image:Joi.allow(""),
	status:Joi.string().required(),
	description:Joi.string().allow(""),
	
	
},
update:{
 	title:Joi.string().required(),
	image:Joi.allow(""),
	status:Joi.string().required(),
	description:Joi.string().allow(""),

}

}