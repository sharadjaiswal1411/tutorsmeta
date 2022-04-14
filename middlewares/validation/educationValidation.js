'use strict';

const response = require('../../helper/response');
const EducationValidation = require('../../validations/education.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, EducationValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, EducationValidation.update);
}