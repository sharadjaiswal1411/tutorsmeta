const Joi = require('joi');
const { email_validation_regex } = require('../constant/common');

module.exports = {

  // POST /v1/auth/register
  register: {
    name: Joi.string().required().min(4).max(100),
    email: Joi.string().regex(email_validation_regex).insensitive().required(),
    password: Joi.string().required(),
    phoneCode:Joi.string().required().min(3).max(6),
    mobileNumber:Joi.string().required().min(10).max(12),
    deviceType:Joi.string().required().min(3).max(12),
    deviceToken:Joi.string().required().min(10).max(50),
    roleId:Joi.string().required()
  },
   // POST /v1/auth/login
	login: {
		email: Joi.string().regex(email_validation_regex).insensitive().required(),
		password: Joi.string().required(),
    rememberMe:Joi.allow(""),
  },

   forgotPassword: {
    phoneCode: Joi.number().required(),
    mobileNumber: Joi.number().required(),
  },

};
