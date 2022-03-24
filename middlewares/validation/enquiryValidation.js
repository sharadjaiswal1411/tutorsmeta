'use strict';

const response = require('../../helper/response');
const enquiryValidation = require('../../validations/enquiry.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, enquiryValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, enquiryValidation.update);
}