const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');



module.exports = {
create:{
	name:Joi.string().required(),
	username:Joi.string().required(),
	email:Joi.string().regex(email_validation_regex).insensitive().required(),
	
	phone:Joi.number().allow(""),
	image:Joi.allow(""),
	address:Joi.string().allow(""),
	experience:Joi.number().required(),
	college:Joi.string().required(),
	about:Joi.string().allow(""),
	courses:Joi.array().allow(""),
	experience:Joi.string().required(),
	joiningDate:Joi.date().required(),
	status:Joi.number().valid('ACTIVE','INACTIVE')

	

	 
},

login: {
		email: Joi.string().regex(email_validation_regex).insensitive().required(),
		password: Joi.string().required(),
        rememberMe:Joi.allow(""),
  },


update:{
	name:Joi.string().required(),
	username:Joi.string().required(),
	email:Joi.string().regex(email_validation_regex).insensitive().required(),
	
	phone:Joi.number().allow(""),
	image:Joi.allow(""),
	address:Joi.string().allow(""),
	experience:Joi.number().required(),
	college:Joi.string().required(),
	about:Joi.string().allow(""),
	courses:Joi.array().allow(""),
	experience:Joi.string().required(),
	joiningDate:Joi.date().required(),
	status:Joi.number().valid('ACTIVE','INACTIVE')
	
    
}

}