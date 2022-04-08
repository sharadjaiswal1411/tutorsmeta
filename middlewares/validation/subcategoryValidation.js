'use strict';

const response = require('../../helper/response');
const subcategoryValidation = require('../../validations/subcategory.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, subcategoryValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, subcategoryValidation.update);
}