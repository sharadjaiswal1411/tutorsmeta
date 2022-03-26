const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');



module.exports = {
create:{
	name:Joi.string().required(),
	email:Joi.string().regex(email_validation_regex).insensitive().required(),
	featured:Joi.string().valid('TRUE', 'FALSE'),
    phone:Joi.number().required(),
    logo:Joi.allow(""),
    shortName:Joi.string().allow(""),
    registeredName:Joi.string().allow(""),
    website:Joi.string().allow(""),
    facebook:Joi.string().allow(""),
    twitter:Joi.string().allow(""),
    linkedIn:Joi.string().allow(""),
    totalEmployees:Joi.string().allow(""),
    startDate:Joi.string().allow(""),
    followersCount:Joi.number().allow(""),
    about:Joi.string().allow(""),
    headquatered:Joi.string().allow(""),
    employeesIndia:Joi.string().allow(""),
    headquaters:Joi.string().allow("")
},


login: {
        email: Joi.string().regex(email_validation_regex).insensitive().required(),
        password: Joi.string().required(),
        rememberMe:Joi.allow(""),
  },

update:{
 	
	name:Joi.string().required(),
	email:Joi.string().regex(email_validation_regex).insensitive().required(),
	
	featured:Joi.string().valid('TRUE', 'FALSE'),
    phone:Joi.number().required(),
    logo:Joi.allow(""),
    shortName:Joi.string().allow(""),
    registeredName:Joi.string().allow(""),
    website:Joi.string().allow(""),
    facebook:Joi.string().allow(""),
    twitter:Joi.string().allow(""),
    linkedIn:Joi.string().allow(""),
    totalEmployees:Joi.string().allow(""),
    startDate:Joi.string().allow(""),
    followersCount:Joi.number().allow(""),
    about:Joi.string().allow(""),
    headquatered:Joi.string().allow(""),
    employeesIndia:Joi.string().allow(""),
    headquaters:Joi.string().allow("")
}

}