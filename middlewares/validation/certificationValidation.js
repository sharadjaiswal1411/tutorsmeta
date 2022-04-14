'use strict';

const response = require('../../helper/response');
const CertificationValidation = require('../../validations/certification.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, CertificationValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, CertificationValidation.update);
}