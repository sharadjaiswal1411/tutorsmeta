'use strict';

const response = require('../../helper/response');
const event_registrationValidation = require('../../validations/event_registration.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, event_registrationValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, event_registrationValidation.update);
}