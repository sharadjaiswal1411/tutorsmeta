const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
     metaTitle:JJoi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     status:Joi.string().valid('ACTIVE','INACTIVE')
},
update:{
 	title:Joi.string().required(),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
     metaTitle:Joi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     status:Joi.string().valid('ACTIVE','INACTIVE')

}

}