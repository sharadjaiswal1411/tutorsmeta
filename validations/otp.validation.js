const Joi = require('joi');

module.exports = {
create:{
	phoneCode:Joi.string().required(),
	mobileNumber:Joi.number().required()
	
	
},
update:{
 	
	phoneCode:Joi.string().required(),
	mobileNumber:Joi.number().required()
	
}

}