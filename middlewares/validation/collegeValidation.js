'use strict';

const response = require('../../helper/response');
const collegeValidation = require('../../validations/college.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, collegeValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, collegeValidation.update);
}