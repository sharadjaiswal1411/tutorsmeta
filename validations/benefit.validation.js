const Joi = require('joi');


module.exports = {

	create:{
     name:Joi.string().required(),
     image:Joi.allow("")
    
	},
	update:{
     name:Joi.string().required(),
     image:Joi.allow("")
   
	}
}