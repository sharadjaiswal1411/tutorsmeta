'use strict';

const response = require('../../helper/response');
const studentValidation = require('../../validations/student.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, studentValidation.create);
}

exports.login = async (req, res, next) => {
    ValidationResponse(res, next, req.body, studentValidation.login);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, studentValidation.update);
}

