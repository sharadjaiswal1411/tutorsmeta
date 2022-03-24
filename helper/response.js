const _ = require('lodash');
const moment = require('moment');
const Joi = require('joi');

module.exports = {

    writeResponse(res, response, status) {
        sw.setHeaders(res);
        res.status(status || 200).send(JSON.stringify(response));
    },

    sendSuccess(data, res, status, message) {
        let response = {
            "status": true,
            "message": 'success',
            "result": {
                code: status,
                message: message,
                data: data
            },
            "responseCode": 200
        };
        let errorCode = 200;
        res.status(errorCode || 200).json(response);
    },
    
    sendCustomError(data, res, status, message) {
        let response = {
            "status": false,
            "message": 'failure',
            "result": {
                code: status,
                message: message,
                data: data
            },
            "responseCode": 500
        };
        let errorCode = 500;
        res.status(errorCode || 200).json(response);
    },

    sendPasswordMismatch(data, res, status, message) {
        let response = {
            "status": false,
            "message": 'failure',
            "result": {
                code: status,
                message: message,
                data: data
            },
            "responseCode": 401
        };
        let errorCode = 200;
        res.status(errorCode || 401).json(response);
    },

    sendNoDataSuccess(data, res, status, message) {
        let response = {
            "status": false,
            "message": 'success',
            "result": {
                code: status,
                message: message,
                data: data
            },
            "responseCode": 204
        };
        let errorCode = 200;
        res.status(errorCode || 200).json(response);
    },

    sendInvalidTokenError(data, res, status, message) {
        let response = {
            "status": false,
            "message": 'failure',
            "result": {
                code: status,
                message: message,
                data: data
            },
            "responseCode": 402
        };
        let errorCode = 401;
        res.status(errorCode || 401).json(response);
    },

    writeError(res, error, status) {
        sw.setHeaders(res);
        res.status(error.status || status || 400).send(JSON.stringify(_.omit(error, ['status'])));
    },

    toTimeZone(time, zone = 'Asia/Kolkata') {
        var format = 'YYYY-MM-DD HH:mm:ss';
        return moment(time, format).tz(zone).format(format);
    },
    ValidationResponse(res, next, object, schema){
        const { error } = Joi.validate(object, schema);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            let response = {
                "status": false,
                "message": 'failure',
                "result": {
                    code: 422,
                    message: message,
                    data: {}
                }
            };
            let errorCode = 422;
            res.status(errorCode || 422).json(response);
        }
    },
}