'use strict';

const response = require('../../helper/response');
const sectionValidation = require('../../validations/section.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, sectionValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, sectionValidation.update);
}