'use strict';

const response = require('../../helper/response');
const TestimonialValidation = require('../../validations/testimonial.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TestimonialValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TestimonialValidation.update);
}