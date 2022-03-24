'use strict';

const response = require('../../helper/response');
const artistValidation = require('../../validations/artist.validation');
const { ValidationResponse } = response;

exports.register = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.register);
}
exports.initialLogin = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.initialLogin);
}
exports.sendOtp = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.sendOtp);
}
exports.verifyOtp = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.verifyOtp);
}
exports.login = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.login);
}

exports.checkArtistEmail = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.checkArtistEmail);
}

exports.resetPassword = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.resetPassword);
}

exports.resetPasswordGet = async (req, res, next) => {
    ValidationResponse(res, next, req.query, artistValidation.resetPasswordGet);
}

exports.updateProfile = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.updateProfile);
}

exports.share = async (req, res, next) => {
    ValidationResponse(res, next, req.body, artistValidation.share);
}