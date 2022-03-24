const Joi = require('joi');

module.exports = {
create:{
	title:Joi.string().required(),
	mode:Joi.string().required(),
	location:Joi.string().required(),
	duration:Joi.string().required(),
	batchStart:Joi.string().required(),
	course:Joi.string().required()
	 
},
update:{
	title:Joi.string().required(),
	mode:Joi.string().required(),
	location:Joi.string().required(),
	duration:Joi.string().required(),
	batchStart:Joi.string().required(),
	course:Joi.string().required()
    
}

}