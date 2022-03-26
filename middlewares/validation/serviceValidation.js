'use strict';

const response = require('../../helper/response');
const serviceValidation = require('../../validations/service.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, serviceValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, serviceValidation.update);
}