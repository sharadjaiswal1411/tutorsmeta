'use strict';

const response = require('../../helper/response');
const TeacherAddressValidation = require('../../validations/teacherAddress.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TeacherAddressValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TeacherAddressValidation.update);
}