'use strict';

const response = require('../../helper/response');
const cityValidation = require('../../validations/city.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, cityValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, cityValidation.update);
}