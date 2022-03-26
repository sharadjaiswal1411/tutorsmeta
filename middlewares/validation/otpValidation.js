'use strict';

const response = require('../../helper/response');
const otpValidation = require('../../validations/otp.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, otpValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, otpValidation.update);
}