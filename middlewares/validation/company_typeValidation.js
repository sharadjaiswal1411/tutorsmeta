'use strict';

const response = require('../../helper/response');
const company_typeValidation = require('../../validations/company_type.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, company_typeValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, company_typeValidation.update);
}