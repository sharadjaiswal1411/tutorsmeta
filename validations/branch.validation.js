const Joi = require('joi');


module.exports = {

	create:{
     title:Joi.string().required(),
     image:Joi.allow(""),
     banner:Joi.allow(""),
     description:Joi.allow(""),
     metaTitle:Joi.allow(""),
     metaDescription:Joi.allow(""),
     status:Joi.string().required()
	},
	update:{
     title:Joi.string().required(),
     image:Joi.allow(""),
     banner:Joi.allow(""),
     description:Joi.allow(""),
     metaTitle:Joi.allow(""),
     metaDescription:Joi.allow(""),
     status:Joi.string().required()
	}
}