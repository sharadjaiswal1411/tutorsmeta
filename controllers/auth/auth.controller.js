const bcrypt = require('bcryptjs');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const { genrateUserToken } = require('../../middlewares/auth-user');
const { User, ObjectId } = require('../../models/user');
const { Otp } = require('../../models/otp');
const { PASSWORD } = require('../../constant/common');
const { sendMail } = require('../../email/email');



const register = async (req, res) => {
    try {
        let {name, email, password,phoneCode,mobileNumber,deviceType,deviceToken,roleId } = req.body;
        email = email.toLowerCase()
        const userDetails = await User.findOne({ email });
        if (userDetails) {
            return sendCustomError({}, res, 0, 'Email already registered.')
        }

        const phoneDetails = await User.findOne({ phoneCode,mobileNumber });
        if (phoneDetails) {
            return sendCustomError({}, res, 0, 'Mobile number already registered.')
        }


        const salt = bcrypt.genSaltSync(PASSWORD.SALT_LENGTH);
        password = bcrypt.hashSync(password.trim(), salt);
        let obj = {
           name, email, password,phoneCode,mobileNumber,deviceType,deviceToken,roleId
        }
        let newUser = new User(obj);
        newUser.save(async (err, data) => {
        
            if (err) {
                if (err.user === 'MongoError' && err.code === 11000) {
                    return sendCustomError({}, res, err.code, 'User has been already registered.')
                } else {
                    return sendCustomError({ err }, res, err.code, err.message)
                }
            } else {
              const userDetails = await User.findOne({ email }).populate('roleId');
               let responseData=userDetails.toJSON();

               delete responseData['password'];

               let token = await genrateUserToken({ email: responseData.email, userId: responseData.id,roleId:responseData.roleId });
              
               responseData['accessToken']=token;
               
               return sendSuccess(responseData, res, 200, "User registered successfully.");
            }
        });
    } catch (error) {
        return sendCustomError({}, res, error.code || 0, error.message)
    }
};

/* login api*/
const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const userDetails = await User.findOne({ email }).populate('roleId');
        if (!userDetails) {
            return sendCustomError({}, res, 401, 'User not found!')
        }
        const isMatchPassword = await userDetails.isValidPassword(res, password);
        if (!isMatchPassword) {
            return sendCustomError({}, res, 200, 'Email/Password not matched!');
        }
        if (userDetails) {
            let token = await genrateUserToken({ email: userDetails.email, userId: userDetails.id,roleId:userDetails.roleId });
              
            let user = await User.findOneAndUpdate({ _id: ObjectId(userDetails.id) },
                { $set: { accessToken: token } },
                { new: true });
              
              let responseData=userDetails.toJSON(); 
              responseData['accessToken']=token;
              delete responseData['password'];
            return sendSuccess(responseData, res, 200, "Logged in successfully.");
        } else {
            return sendCustomError({}, res, 400, "Something went wrong!");
        }
    } catch (error) {
        console.log(error);
        return sendCustomError({}, res, error.code || 401, error.message)
    }
};





   const forgotPassword = async (req, res) => {
   let data = await User.findOne({number:req.body.mobileNumber});
   const response={};
   if(data){
    let otpCode=Math .floor((Math.random()*10000)+1);
    let otpData=new otp({
        mobileNumber:req.body.mobileNumber,
        code:optCode,
       
    })
    
    let otpResponse=await otpData.save();
    responseType.statusText='success'
    responseType.message ='please check your mobileNumber'
   }
   else{
     responseType.statusText='error'
    responseType.message ='Not found this mobileNumber'
   }
          


  
   
}




module.exports = {
    register,
    login,
    forgotPassword,
};
