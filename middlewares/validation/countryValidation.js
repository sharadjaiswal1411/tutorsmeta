'use strict';

const response = require('../../helper/response');
const countryValidation = require('../../validations/country.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, countryValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, countryValidation.update);
}