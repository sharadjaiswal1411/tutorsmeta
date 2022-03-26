'use strict';

const response = require('../../helper/response');
const curriculumValidation = require('../../validations/curriculum.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, curriculumValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, curriculumValidation.update);
}