'use strict';

const response = require('../../helper/response');
const personValidation = require('../../validations/person.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, personValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, personValidation.update);
}