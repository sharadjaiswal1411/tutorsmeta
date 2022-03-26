'use strict';

const response = require('../../helper/response');
const courseValidation = require('../../validations/course.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, courseValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, courseValidation.update);
}