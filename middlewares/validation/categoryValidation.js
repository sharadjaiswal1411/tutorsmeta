'use strict';

const response = require('../../helper/response');
const categoryValidation = require('../../validations/category.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, categoryValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, categoryValidation.update);
}