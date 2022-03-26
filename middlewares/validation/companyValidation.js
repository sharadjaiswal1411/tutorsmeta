'use strict';

const response = require('../../helper/response');
const companyValidation = require('../../validations/company.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, companyValidation.create);
}

exports.login = async (req, res, next) => {
    ValidationResponse(res, next, req.body, companyValidation.login);
}


exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, companyValidation.update);
}