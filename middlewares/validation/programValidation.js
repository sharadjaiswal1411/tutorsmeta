'use strict';

const response = require('../../helper/response');
const programValidation = require('../../validations/program.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, programValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, programValidation.update);
}