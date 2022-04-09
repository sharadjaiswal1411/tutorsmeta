const Joi = require('joi');


module.exports = {

	create:{
     name:Joi.string().required(),
     image:Joi.allow(""),
     banner:Joi.allow(""),
     description:Joi.allow(""),
     metaTitle:Joi.allow(""),
     metaDescription:Joi.allow(""),
     status:Joi.string().required()
	},
	update:{
     name:Joi.string().required(),
     image:Joi.allow(""),
     banner:Joi.allow(""),
     description:Joi.allow(""),
     metaTitle:Joi.allow(""),
     metaDescription:Joi.allow(""),
     status:Joi.string().required()
	}
}