const Joi = require('joi');

module.exports = {
create:{
	name:Joi.string().required(),
	image:Joi.allow(""),
	status:Joi.string().required(),
	description:Joi.string().allow(""),
	state_id:Joi.string(),
	state_code:Joi.string(),
	country_id:Joi.string(),
	country_code:Joi.string(),

	latitude:Joi.string(),
	longitude:Joi.string(),
	created_at:Joi.string(),
	updated_at:Joi.string(),
	flag:Joi.string(),
	wikiDataId:Joi.string(),
	slug:Joi.string() 
	
	
},
update:{
	name:Joi.string().required(),
	image:Joi.allow(""),
	status:Joi.string().required(),
	description:Joi.string().allow(""),
	state_id:Joi.string(),
	state_code:Joi.string(),
	country_id:Joi.string(),
	country_code:Joi.string(),

	latitude:Joi.string(),
	longitude:Joi.string(),
	created_at:Joi.string(),
	updated_at:Joi.string(),
	flag:Joi.string(),
	wikiDataId:Joi.string(),
	slug:Joi.string()

}

}