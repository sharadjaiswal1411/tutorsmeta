const Joi = require('joi');

module.exports = {
create:{
	name:Joi.string().required(),
	country_id:Joi.string(),
	country_code:Joi.string(),
	fips_code:Joi.string(),
	iso2:Joi.string(),
	type:Joi.string(),
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
	country_id:Joi.string(),
	country_code:Joi.string(),
	fips_code:Joi.string(),
	iso2:Joi.string(),
	type:Joi.string(),
	latitude:Joi.string(),
	longitude:Joi.string(),
	created_at:Joi.string(),
	updated_at:Joi.string(),
	flag:Joi.string(),
	wikiDataId:Joi.string(),
	slug:Joi.string() 
	

}

}