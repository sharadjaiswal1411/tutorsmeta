'use strict';

const response = require('../../helper/response');
const benefitValidation = require('../../validations/benefit.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, benefitValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, benefitValidation.update);
}