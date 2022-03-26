const Joi = require('joi');

module.exports = {
create:{
	
	firstName:Joi.string().allow(""),
	designation:Joi.string().allow(""),
	location:Joi.string().allow(""),
	previousCompany:Joi.string().allow(""),
	educationalPast:Joi.string().allow(""),
    professionalPast:Joi.string().allow(""),
    profileImage:Joi.string().allow(""),
    source:Joi.string().allow("")


},
update:{
 	
	firstName:Joi.string().allow(""),
	designation:Joi.string().allow(""),
	location:Joi.string().allow(""),
	previousCompany:Joi.string().allow(""),
	educationalPast:Joi.string().allow(""),
    professionalPast:Joi.string().allow(""),
    profileImage:Joi.string().allow(""),
    source:Joi.string().allow("")
	
	
}

}