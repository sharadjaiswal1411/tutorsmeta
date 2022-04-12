'use strict';

const response = require('../../helper/response');
const TeacherValidation = require('../../validations/teacher.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TeacherValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, TeacherValidation.update);
}