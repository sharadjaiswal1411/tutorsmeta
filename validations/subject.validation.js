const Joi = require('joi');

module.exports = {
create:{
	 name: Joi.string().required().min(1).max(100),
	 status:Joi.string()
	 
},
update:{
     name: Joi.string().min(1).max(100),
     status:Joi.string()
	
}

}