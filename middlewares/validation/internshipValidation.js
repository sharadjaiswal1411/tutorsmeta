'use strict';

const response = require('../../helper/response');
const internshipValidation = require('../../validations/internship.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, internshipValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, internshipValidation.update);
}