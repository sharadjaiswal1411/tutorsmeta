const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	branch:Joi.string().required(),
	college:Joi.string().required(),
	instructor:Joi.string().required(),
	banner:Joi.allow(""),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	regType:Joi.string().valid('FREE','PAID'),
    regFees:Joi.number().allow(""),
    startDate:Joi.date().required(""),
    endDate:Joi.date().required(""),
    type:Joi.string().valid('WORKSHOP','SEMINAR','CODING_CHALLENGE'),
    metaTitle:Joi.string().allow(""),
    metaDescription:Joi.string().allow(""),
    status:Joi.string().valid('ACTIVE','INACTIVE')
	


},
update:{
	title:Joi.string().required(),
	branch:Joi.string().required(),
	college:Joi.string().required(),
	instructor:Joi.string().required(),
	banner:Joi.allow(""),
	image:Joi.allow(""),
	description:Joi.string().allow(""),
	regType:Joi.string().valid('FREE','PAID'),
    regFees:Joi.number().allow(""),
    startDate:Joi.date().required(""),
    endDate:Joi.date().required(""),
    type:Joi.string().valid('WORKSHOP','SEMINAR','CODING_CHALLENGE'),
    metaTitle:Joi.string().allow(""),
    metaDescription:Joi.string().allow(""),
    status:Joi.string().valid('ACTIVE','INACTIVE')
	
 
}

}