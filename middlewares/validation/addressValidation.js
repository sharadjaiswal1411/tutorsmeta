'use strict';

const response = require('../../helper/response');
const addressValidation = require('../../validations/address.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, addressValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, addressValidation.update);
}