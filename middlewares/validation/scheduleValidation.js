'use strict';

const response = require('../../helper/response');
const scheduleValidation = require('../../validations/schedule.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, scheduleValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, scheduleValidation.update);
}