'use strict';

const response = require('../../helper/response');
const eventValidation = require('../../validations/event.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, eventValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, eventValidation.update);
}