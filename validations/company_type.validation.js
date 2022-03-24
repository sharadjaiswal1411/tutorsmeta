const Joi = require('joi');

module.exports = {
create:{
	name:Joi.string().required(),
	
	
},
update:{
 	
	name:Joi.string().required(),
	
}

}