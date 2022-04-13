'use strict';

const response = require('../../helper/response');
const LanguageValidation = require('../../validations/language.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, LanguageValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, LanguageValidation.update);
}