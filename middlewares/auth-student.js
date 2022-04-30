const blueBirdPromise = require('bluebird');
const jwt = blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const { PRIVATE_KEY } = require('../config/index');
const { settings } = require('../constant/common');
const { Student } = require('../models/student');
const { sendCustomError, sendInvalidTokenError } = require('../helper/response');


const studentAuth = (req, res, next) => {
    const deviceType = req.headers['devicetype'] ? req.headers['devicetype'] : 'web';
    const deviceToken= req.headers['devicetoken'] ? req.headers['devicetoken'] : '';
    const token      = req.headers['Authorization'] || req.headers['authorization'];
    const locale     = req.headers['locale'] ? req.headers['locale'] : 'en';
    
    if (!token) {
        return sendCustomError("", res, 1, "No token provided.");
    } else {
        jwt.verify(token, PRIVATE_KEY, async function (error, decoded) {
            if (error) {
                sendInvalidTokenError(error, res, 3, "Invalid token.");
            } else if (decoded.userid == 0 || undefined || '') {
                sendInvalidTokenError(error, res, 3, "User doesn't exist.");
            }else {
                const result = await Student.findOne({ accessToken: token });
                if (result) {
                    //if (result.status == false || result.status == 0) {
                    //   sendInvalidTokenError(error, res, 3, "Your account has been inactived by admin.");
                    //} else{
                        req.data = {
                            studentId: decoded.studentId,
                            email: decoded.email,
                            token: token,
                            deviceType: deviceType,
                            deviceToken: deviceToken   
                       }
                        return next();
                    //}
                } else {
                    sendInvalidTokenError(error, res, 3, "User session expired.");
                }
            }
        })
    }
};

const genrateStudentToken = (data) => {
    const options = { expiresIn: settings.expiresIn };

    return jwt.signAsync(data, PRIVATE_KEY, options)
        .then( (jwtToken) => {
            return jwtToken;
        }).catch(error => {
            return sendCustomError({}, res, error.errorCode, error.message);
    });
};


module.exports = {
    genrateStudentToken,
    studentAuth
};
