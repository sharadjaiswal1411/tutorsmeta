'use strict';

const response = require('../../helper/response');
const adminValidation = require('../../validations/auth.validation');
const { ValidationResponse } = response;

exports.register = async (req, res, next) => {
    ValidationResponse(res, next, req.body, adminValidation.register);
}

exports.login = async (req, res, next) => {
    ValidationResponse(res, next, req.body, adminValidation.login);
}
exports.forgotPassword  = async (req, res, next) => {
    ValidationResponse(res, next, req.body, adminValidation.forgotPassword);
}