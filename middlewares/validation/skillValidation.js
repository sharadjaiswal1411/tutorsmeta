'use strict';

const response = require('../../helper/response');
const skillValidation = require('../../validations/skill.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, skillValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, skillValidation.update);
}