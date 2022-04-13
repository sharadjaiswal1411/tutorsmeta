const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');



module.exports = {
create:{
	userId:Joi.string(),
	slug:Joi.string(),
	about:Joi.string(),
	board:Joi.string(),
	school:Joi.string(),
	college:Joi.string(),
	subcategory:Joi.string(),
	cityId:Joi.string(),
	created_at:Joi.date(),

	// username:Joi.string(),
	// email:Joi.string().regex(email_validation_regex).insensitive(),
	
	// phone:Joi.number().allow(""),
	// image:Joi.allow(""),
	// address:Joi.string().allow(""),
	// experience:Joi.number(),
	// college:Joi.string(),
	// about:Joi.string().allow(""),
	// courses:Joi.array().allow(""),
	// experience:Joi.string(),
	// joiningDate:Joi.date(),
	status:Joi.number().valid('ACTIVE','INACTIVE')

	

	 
},

login: {
		email: Joi.string().regex(email_validation_regex).insensitive().required(),
		password: Joi.string().required(),
        rememberMe:Joi.allow(""),
  },


update:{
	userId:Joi.string(),
	slug:Joi.string(),
	about:Joi.string(),
	board:Joi.string(),
	school:Joi.string(),
	college:Joi.string(),
	subcategory:Joi.string(),
	cityId:Joi.string(),
	created_at:Joi.date(),
	updatedted_at:Joi.date(),

	// username:Joi.string(),
	// email:Joi.string().regex(email_validation_regex).insensitive(),
	
	// phone:Joi.number().allow(""),
	// image:Joi.allow(""),
	// address:Joi.string().allow(""),
	// experience:Joi.number(),
	// college:Joi.string(),
	// about:Joi.string().allow(""),
	// courses:Joi.array().allow(""),
	// experience:Joi.string(),
	// joiningDate:Joi.date(),
	status:Joi.number().valid('ACTIVE','INACTIVE')
	
    
}

}