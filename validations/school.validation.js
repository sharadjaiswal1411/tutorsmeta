const Joi = require('joi');


module.exports = {

	create:{
     
     name:Joi.string().required(),
  //   subcategoryId:Joi.string(),
    // parent:Joi.allow(""),
     //title:Joi.string().required(),
     slug:Joi.allow(""),
     banner:Joi.allow(""),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
  //   featured:Joi.string().valid('TRUE', 'FALSE'),
     metaTitle:Joi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     status: Joi.string()
	},
	update:{
     
     name:Joi.string(),
  //   subcategoryId:Joi.string(),
     //parent:Joi.allow(""),
     //title:Joi.string().required(),
     //featured:Joi.string().valid('TRUE', 'FALSE'),
     slug:Joi.allow(""),
     banner:Joi.allow(""),
     image:Joi.allow(""),
     description:Joi.string().allow(""),
     metaTitle:Joi.string().allow(""),
     metaDescription:Joi.string().allow(""),
     status: Joi.string()
	}
}