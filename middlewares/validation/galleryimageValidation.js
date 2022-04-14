'use strict';

const response = require('../../helper/response');
const GalleryimageValidation = require('../../validations/galleryimage.validation');
const { ValidationResponse } = response;

exports.create = async (req, res, next) => {
    ValidationResponse(res, next, req.body, GalleryimageValidation.create);
}

exports.update = async (req, res, next) => {
    ValidationResponse(res, next, req.body, GalleryimageValidation.update);
}