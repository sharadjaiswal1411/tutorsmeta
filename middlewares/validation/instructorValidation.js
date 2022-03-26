'use strict';

const response = require('../../helper/response');
const instructorValidation = require('../../validations/instructor.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, instructorValidation.create);
}

exports.login = async (req, res, next) =>{
    ValidationResponse(res, next, req.body, instructorValidation.login);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, instructorValidation.update);
}