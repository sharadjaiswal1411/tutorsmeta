const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	description:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')

	 
},
update:{
	title:Joi.string().required(),
	description:Joi.string().allow(""),
	status:Joi.string().valid('ACTIVE','INACTIVE')
    
}

}