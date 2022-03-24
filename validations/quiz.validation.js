const Joi = require('joi');

module.exports = {
create:{
	 course:Joi.string().required(),
	 category:Joi.string().required(),
	 instructor:Joi.string().required(),
	 title:Joi.required(),
	 banner:Joi.allow(""),
	 image:Joi.allow(""),
	 branch:Joi.string().required(),
	 description:Joi.string().allow(""),
	 duration:Joi.string().required(),
	 questions:Joi.allow(""),
	 metaTitle:Joi.string().allow(""),
	 metaDescription:Joi.string().allow(""),
	 status:Joi.string().valid('ACTIVE','INACTIVE')

},
update:{
    
    course:Joi.string().required(),
	 category:Joi.string().required(),
	 instructor:Joi.string().required(),
	 title:Joi.string().required(),
	 branch:Joi.string().required(),
	 banner:Joi.allow(""),
	 image:Joi.allow(""),
	 description:Joi.string().allow(""),
	 duration:Joi.string().required(),
	 questions:Joi.allow(""),
	 metaTitle:Joi.string().allow(""),
	 metaDescription:Joi.string().allow(""),
	 status:Joi.string().valid('ACTIVE','INACTIVE')
	
}

}