const Joi = require('joi');

module.exports = {
create:{
	name:Joi.string().required(),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	contact_no:Joi.allow(""),
	contact_email:Joi.string().allow(""),
	contact_person:Joi.string().allow(""),
	established_in:Joi.allow(""),
	affiliation:Joi.string().allow(""),
	banner:Joi.allow(""),
	address:Joi.string().allow(""),
	type:Joi.string(),
	status:Joi.string().required(""),
	
},
update:{
 	name:Joi.string().required(),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	contact_no:Joi.allow(""),
	contact_email:Joi.string().allow(""),
	contact_person:Joi.string().allow(""),
	established_in:Joi.allow(""),
	affiliation:Joi.string().allow(""),
	banner:Joi.allow(""),
	address:Joi.string().allow(""),
	type:Joi.string(),
	status:Joi.string().required(""),
	
}

}