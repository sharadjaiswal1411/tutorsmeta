'use strict';

const response = require('../../helper/response');
const userValidation = require('../../validations/user.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, userValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, userValidation.update);
}

