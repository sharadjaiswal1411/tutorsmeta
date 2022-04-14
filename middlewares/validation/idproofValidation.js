'use strict';

const response = require('../../helper/response');
const IdproofValidation = require('../../validations/idproof.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, IdproofValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, IdproofValidation.update);
}