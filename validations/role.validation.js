const Joi = require('joi');

module.exports = {
create:{
	 name: Joi.string().required().min(4).max(100),
	 status:Joi.boolean().required()
	 
},
update:{
     name: Joi.string().required().min(4).max(100),
     status:Joi.boolean().required()
	
}

}