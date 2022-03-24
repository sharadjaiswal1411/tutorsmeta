'use strict';

const response = require('../../helper/response');
const questionValidation = require('../../validations/question.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, questionValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, questionValidation.update);
}