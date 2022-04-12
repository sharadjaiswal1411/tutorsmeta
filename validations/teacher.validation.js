const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');



module.exports = {
create:{
	userid:Joi.string().required(),
	slug:Joi.string(),
	tagline:Joi.string(),
	shortBio:Joi.string(),
	about:Joi.string().allow(""),
	emailVisible:Joi.string(),
	mobileVisible:Joi.string(),
	profileVisible:Joi.string(),
	emailVerified:Joi.string(),
	hourlyRate:Joi.string(),
	teachingSince:Joi.string(),
	cityId:Joi.string(),
	created_at:Joi.date(),
	status:Joi.string().valid('ACTIVE','INACTIVE')

	

	 
},

login: {
		email: Joi.string().regex(email_validation_regex).insensitive().required(),
		password: Joi.string().required(),
        rememberMe:Joi.allow(""),
  },


update:{
	userid:Joi.string().required(),
	slug:Joi.string(),
	tagline:Joi.string(),
	shortBio:Joi.string(),
	about:Joi.string().allow(""),
	emailVisible:Joi.string(),
	mobileVisible:Joi.string(),
	profileVisible:Joi.string(),
	emailVerified:Joi.string(),
	hourlyRate:Joi.string(),
	teachingSince:Joi.string(),
	cityId:Joi.string(),
	created_at:Joi.date(),
	updated_at:Joi.date(),
	status:Joi.string().valid('ACTIVE','INACTIVE')

	
}

}


// userid,slug,tagline,shortBio,about,emailVisible,mobileVisible,profileVisible,emailVerified,hourlyRate,teachingSince,cityId,created_at,updated_at,status
