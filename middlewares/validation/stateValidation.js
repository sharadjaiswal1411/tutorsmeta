'use strict';

const response = require('../../helper/response');
const StateValidation = require('../../validations/state.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, StateValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, StateValidation.update);
}