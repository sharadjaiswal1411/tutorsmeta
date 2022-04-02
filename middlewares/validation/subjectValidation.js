'use strict';

const response = require('../../helper/response');
const subjectValidation = require('../../validations/subject.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, subjectValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, subjectValidation.update);
}