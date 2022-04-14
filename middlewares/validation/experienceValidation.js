'use strict';

const response = require('../../helper/response');
const ExperienceValidation = require('../../validations/experience.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, ExperienceValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, ExperienceValidation.update);
}