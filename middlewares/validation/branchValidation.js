'use strict';

const response = require('../../helper/response');
const branchValidation = require('../../validations/branch.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, branchValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, branchValidation.update);
}