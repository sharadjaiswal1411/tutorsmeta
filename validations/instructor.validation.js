const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');




module.exports = {
create:{
	 name: Joi.string().required().min(4).max(100),
	 email:Joi.string().regex(email_validation_regex).insensitive().required(),
	
	phone:Joi.number().allow(""),
	 image:Joi.allow(""),
	 address:Joi.string().required(),
	 salary:Joi.number().required(),
	 designation:Joi.string().required(),
	 experience:Joi.number().required(),
	 about:Joi.string().allow(""),
	 employementType:Joi.string().valid('FULLTIME', 'PARTTIME','HOURLY'),
	 metaTitle:Joi.string().allow(""),
	 metaDescription:Joi.string().allow(""),
	 featured:Joi.string().valid('TRUE', 'FALSE'),
	 status:Joi.string().valid('ACTIVE', 'INACTIVE')
	 
},

login: {
		email: Joi.string().regex(email_validation_regex).insensitive().required(),
		password: Joi.string().required(),
        rememberMe:Joi.allow(""),
  },

update:{


     name: Joi.string().required().min(4).max(100),
	 email:Joi.string().regex(email_validation_regex).insensitive().required(),
	 featured:Joi.string().valid('TRUE', 'FALSE'),
	phone:Joi.number().allow(""),
	image:Joi.allow(""),
	 address:Joi.string().required(),
	 salary:Joi.number().required(),
	 designation:Joi.string().required(),
	 experience:Joi.number().required(),
	 about:Joi.string().allow(""),
	 employementType: Joi.string().valid('FULLTIME', 'PARTTIME','HOURLY'),
	 metaTitle:Joi.string().allow(""),
	 metaDescription:Joi.string().allow(""),
	 status:Joi.string().valid('ACTIVE', 'INACTIVE')


}


}