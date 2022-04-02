const Joi = require('joi');


module.exports = {

	create:{
     
     name:Joi.string().required(),
     parent:Joi.allow(""),
     //title:Joi.string().required(),
     banner:Joi.allow(""),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
     featured:Joi.string().valid('TRUE', 'FALSE'),
     metaTitle:Joi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     //status: Joi.string().required()
	},
	update:{
     
     name:Joi.string().required(),
     parent:Joi.allow(""),
     //title:Joi.string().required(),
     featured:Joi.string().valid('TRUE', 'FALSE'),
     banner:Joi.allow(""),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
     metaTitle:Joi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     //status: Joi.string().required()
	}
}