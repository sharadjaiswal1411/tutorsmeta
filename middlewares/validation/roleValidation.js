'use strict';

const response = require('../../helper/response');
const roleValidation = require('../../validations/role.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, roleValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, roleValidation.update);
}