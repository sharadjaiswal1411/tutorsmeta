'use strict';

const response = require('../../helper/response');
const FeatureValidation = require('../../validations/feature.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, FeatureValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, FeatureValidation.update);
}