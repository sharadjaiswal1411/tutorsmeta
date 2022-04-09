const Joi = require('joi');

module.exports = {
create:{
	name:Joi.string().required(),
	iso3:Joi.string(),
	numeric_code:Joi.string(),
	iso2:Joi.string(),
	phonecode:Joi.string(),
	capital:Joi.string(),
	currency:Joi.string(),
	currency_name:Joi.string(),
	currency_symbol:Joi.string(),
	tld:Joi.string(),
	native:Joi.string(),
	region:Joi.string(),
	subregion:Joi.string(),
	timezones:Joi.string(),
	translations:Joi.string(),
	latitude:Joi.string(),
	longitude:Joi.string(),
	emoji:Joi.string(),
	emojiU:Joi.string(),
	created_at:Joi.string(),
	updated_at:Joi.string(),
	flag:Joi.string(),
	wikiDataId:Joi.string(),
	slug:Joi.string() 
	
},
update:{
 
	name:Joi.string().required(),
	iso3:Joi.string(),
	numeric_code:Joi.string(),
	iso2:Joi.string(),
	phonecode:Joi.string(),
	capital:Joi.string(),
	currency:Joi.string(),
	currency_name:Joi.string(),
	currency_symbol:Joi.string(),
	tld:Joi.string(),
	native:Joi.string(),
	region:Joi.string(),
	subregion:Joi.string(),
	timezones:Joi.string(),
	translations:Joi.string(),
	latitude:Joi.string(),
	longitude:Joi.string(),
	emoji:Joi.string(),
	emojiU:Joi.string(),
	created_at:Joi.string(),
	updated_at:Joi.string(),
	flag:Joi.string(),
	wikiDataId:Joi.string(),
	slug:Joi.string() 
	

}

}