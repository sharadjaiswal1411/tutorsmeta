const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	course:Joi.string().required(),
	status:Joi.string().required(),
	
},
update:{
	title:Joi.string().required(),
	course:Joi.string().required(),
	status:Joi.string().required(),
 	
}

}