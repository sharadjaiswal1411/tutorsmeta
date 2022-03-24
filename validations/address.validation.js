const Joi = require('joi');


module.exports = {

	create:{
     
     officeName:Joi.string().required(),
     officeAddress:Joi.string().required(),
     pincode:Joi.string().allow(""),
     gpsLat:Joi.number().allow(""),
      gpsLng:Joi.number().allow(""),
        city:Joi.string().required("")
    
	},
	update:{
     
     officeName:Joi.string().required(),
     officeAddress:Joi.string().required(),
     pincode:Joi.string().allow(""),
     gpsLat:Joi.number().allow(""),
      gpsLng:Joi.number().allow(""),
        city:Joi.string().required("")
	}
}