'use strict';

const response = require('../../helper/response');
const membershipValidation = require('../../validations/membership.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, membershipValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, membershipValidation.update);
}