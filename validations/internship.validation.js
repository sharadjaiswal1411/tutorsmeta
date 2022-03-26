const Joi = require('joi');

module.exports = {
create:{
	branch:Joi.string().required(),
   category:Joi.string().required(),
   company:Joi.string().required(),
   city:Joi.string().required(),
   title:Joi.string().required(),
   location:Joi.string().required(),
    banner:Joi.allow(""),
    image:Joi.allow(""),
    description:Joi.string().allow(""),
    duration:Joi.string().required(),
    stipend:Joi.number().allow(""),
    skills:Joi.string().required(),
    instructions:Joi.string().allow(""),
    responsibility:Joi.string().allow(""),
    benefits:Joi.string().allow(""),
    paytype:Joi.string().required().valid('FREE','STIPEND','PAID'),
    type:Joi.string().required().valid('FULLTIME','PARTTIME'),
    metaTitle:Joi.string().allow(""),
    metaDescription:Joi.string().allow(""),
    status:Joi.string().required().valid('ACTIVE','INACTIVE')



},

update:{
branch:Joi.string().required(),
   category:Joi.string().required(),
   company:Joi.string().required(),
   city:Joi.string().required(),
   title:Joi.string().required(),
   location:Joi.string().required(),
    banner:Joi.allow(""),
    image:Joi.allow(""),
    description:Joi.string().allow(""),
    duration:Joi.string().required(),
    stipend:Joi.number().allow(""),
    skills:Joi.string().required(),
    instructions:Joi.string().allow(""),
    responsibility:Joi.string().allow(""),
    benefits:Joi.string().allow(""),
    paytype:Joi.string().required().valid('FREE','STIPEND','PAID'),
    type:Joi.string().required().valid('FULLTIME','PARTTIME'),
    metaTitle:Joi.string().allow(""),
    metaDescription:Joi.string().allow(""),
    status:Joi.string().required().valid('ACTIVE','INACTIVE')


}


}