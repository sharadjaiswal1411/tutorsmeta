'use strict';

const response = require('../../helper/response');
const boardValidation = require('../../validations/board.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, boardValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, boardValidation.update);
}