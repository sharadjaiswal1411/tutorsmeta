'use strict';

const response = require('../../helper/response');
const StudentAddressValidation = require('../../validations/studentAddress.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, StudentAddressValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, StudentAddressValidation.update);
}