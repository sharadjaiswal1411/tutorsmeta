const Joi = require('joi');
// teacherId,studentId,rating,review,created_at,updated_at
module.exports = {
create:{
     name: Joi.string().required()

	 
},
update:{
     name: Joi.string().required()
}

}