var express= require('express');
var app    = express();
const blueBirdPromise = require('bluebird');
const jwt = blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const { PRIVATE_KEY } = require('../config/index');
const { settings } = require('../constant/common');
const { sendCustomError, sendInvalidTokenError } = require('../helper/response');
const Student = require('../models/student');
const User = require('../models/user');

const authenticate = (req, res, next) => {
    const deviceType = req.headers['devicetype'] ? req.headers['devicetype'] : 'web';
    const deviceToken= req.headers['devicetoken'] ? req.headers['devicetoken'] : '';
    const token      = req.headers['Authorization'] || req.headers['authorization'];  // eslint-disable-line
    const locale     = req.headers['locale'] ? req.headers['locale'] : 'en';
    app.set('locale', locale);
    global.LOCALE= app.get('locale');
    if (!token) {
        return sendCustomError("", res, 1, "No token provided.");
    } else {
        jwt.verify(token, PRIVATE_KEY, async function (error, decoded) {
            if (error) {
                sendInvalidTokenError(error, res, 3, "Invalid token.");
            } else if (decoded.userId == 0 || undefined || '') {
                sendInvalidTokenError(error, res, 3, "User doesn't exist.");
            }else {
                const result = await User.findOne({ accessToken: token });
                if (result) {
                    if (result.status == false || result.status == 0) {
                        sendInvalidTokenError(error, res, 3, "Your account has been inactived by admin.");
                    } else{
                        req.data = {
                            userId: decoded.userId,
                            email: decoded.email,
                            token: token,
                            deviceType: deviceType,
                            deviceToken: deviceToken   
                        }
                        return next();
                    }
                } else {
                    sendInvalidTokenError(error, res, 3, "User session expired.");
                }
            }
        })
    }
};

const genrateUserToken = (data) => {
    const options = { expiresIn: settings.expiresIn };
    return jwt.signAsync(data, PRIVATE_KEY, options)
        .then( (jwtToken) => {
            return jwtToken;
        }).catch(error => {
            return sendCustomError({}, res, error.errorCode, error.message);
        })
};

module.exports = {
    genrateUserToken,
     authenticate
};
