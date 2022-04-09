'use strict';

const response = require('../../helper/response');
const schoolValidation = require('../../validations/school.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, schoolValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, schoolValidation.update);
}