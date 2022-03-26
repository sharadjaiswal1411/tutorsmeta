'use strict';

const response = require('../../helper/response');
const quizValidation = require('../../validations/quiz.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, quizValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, quizValidation.update);
}