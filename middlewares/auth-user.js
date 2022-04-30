const blueBirdPromise = require('bluebird');
const jwt = blueBirdPromise.promisifyAll(require('jsonwebtoken'));
const { PRIVATE_KEY } = require('../config/index');
const { settings } = require('../constant/common');
const { User } = require('../models/user');
const { sendCustomError, sendInvalidTokenError } = require('../helper/response');


const adminAuth=(req,res,next)=>{
 const deviceType = req.headers['devicetype'] ? req.headers['devicetype'] : 'WEB';
    const deviceToken= req.headers['devicetoken'] ? req.headers['devicetoken'] : '';
    const token      = req.headers['Authorization'] || req.headers['authorization'];
    const locale     = req.headers['locale'] ? req.headers['locale'] : 'en';
    
    if (!token) {
        return sendCustomError("", res, 401, "No token provided.");
    } else {
        jwt.verify(token, PRIVATE_KEY, async function (error, decoded) {
            if (error) {
                sendCustomError(error, res, 401, "Invalid token.");
            } else if (decoded.userid == 0 || undefined || '') {
                sendCustomError(error, res, 401, "User doesn't exist.");
            }else {
                const result = await User.findOne({ accessToken: token }).populate('roleId');
                if (result) {

                       let role=result.roleId;

                       if(!role){
                          sendCustomError(error, res, 401, "Unauthorised access: Invalid user role");
                       }

                       if(role.name!='ADMIN'){

                          sendCustomError(error, res, 401, "Unauthorised access: Only admin is allowed to perform this action.");
                       }
                  
                       
                        req.data = {
                            userid: decoded.userid,
                            email: decoded.email,
                            token: token,
                            deviceType: deviceType,
                            deviceToken: deviceToken   
                       }
                        return next();
                  
                } else {
                    sendCustomError(error, res, 401, "User session expired.");
                }
            }
        })
    }

}

const userAuth = (req, res, next) => {
    const deviceType = req.headers['devicetype'] ? req.headers['devicetype'] : 'web';
    const deviceToken= req.headers['devicetoken'] ? req.headers['devicetoken'] : '';
    const token= req.headers['Authorization'] || req.headers['authorization'];
    const locale     = req.headers['locale'] ? req.headers['locale'] : 'en';
    
    if (!token) {
        return sendCustomError("", res, 401, "No token provided.");
    } else {
        jwt.verify(token, PRIVATE_KEY, async function (error, decoded) {
            if (error) {
                sendCustomError(error, res, 401, "Invalid token.");
            } else if (decoded.userid == 0 || undefined || '') {
                sendCustomError(error, res, 401, "User doesn't exist.");
            }else {
                const result = await User.findOne({ accessToken: token });
                if (result) {
                  
                        req.data = {
                            userid: decoded.userid,
                            email: decoded.email,
                            token: token,
                            deviceType: deviceType,
                            deviceToken: deviceToken   
                       }
                        return next();
                  
                } else {
                    sendCustomError(error, res, 401, "User session expired.");
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
    });
};


module.exports = {
    genrateUserToken,
    userAuth,
    adminAuth
};
