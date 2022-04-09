'use strict';

const response = require('../../helper/response');
const classValidation = require('../../validations/class.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, classValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, classValidation.update);
}