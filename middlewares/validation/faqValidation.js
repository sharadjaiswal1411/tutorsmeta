'use strict';

const response = require('../../helper/response');
const faqValidation = require('../../validations/faq.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, faqValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, faqValidation.update);
}