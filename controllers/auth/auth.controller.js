const bcrypt = require('bcryptjs');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const { genrateUserToken } = require('../../middlewares/auth-user');
const { User, ObjectId } = require('../../models/user');
const { Teacher } = require('../../models/teacher');
const { Student } = require('../../models/student');
const { StudentAddress } = require('../../models/studentAddress');
const { TeacherAddress } = require('../../models/teacherAddress');
const { Education } = require('../../models/education');
const { Idproof } = require('../../models/idproof');
const { Certification } = require('../../models/certification');
const { Experience } = require('../../models/experience');
const { Feature } = require('../../models/feature');
const { Galleryimage } = require('../../models/galleryimage');

const { Otp } = require('../../models/otp');
const { PASSWORD } = require('../../constant/common');
const { sendMail } = require('../../email/email');
const { Role } = require('../../models/role');
const  slugify = require('slugify');

const register = async (req, res) => {
     
    try {
        let {name, email, password,phoneCode,mobileNumber,deviceType,deviceToken,roleId } = req.body;
        email = email.toLowerCase()
 console.log("register");       
        const userDetails = await User.findOne({ email });
        if (userDetails) {
            return sendCustomError({}, res, 0, 'Email already registered.')
        }

        const phoneDetails = await User.findOne({ phoneCode,mobileNumber });
        if (phoneDetails) {
            return sendCustomError({}, res, 0, 'Mobile number already registered.')
        }



        
// const roleDetails = await Role.findOne({ name : roleId});
// console.log(  roleDetails._id)
// if(roleDetails)
//      {sendSuccess(roleDetails._id , res, 200, "Roles details.");
//      roleId=roleDetails._id;}
// else
//   return sendCustomError({}, res, 500, "Error in fetching role details.")

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

               let token = await genrateUserToken({ email: responseData.email, userid: responseData.id,roleId:responseData.roleId });
              
               responseData['accessToken']=token;
                

               if(userDetails.roleId.name=="TEACHERS"){
                
                    let teacherData={
                        userid:userDetails._id
                    }
                    let newTeacher = new Teacher(teacherData);
                    newTeacher.save(async (err, data) => {
                        if(err){
                            console.log("err",err)
                            if(err.code==11000){
                                return sendCustomError({}, res, 500, 'teacher already exists.');
                            }else{
                                 return sendCustomError({}, res, 500, 'Error in adding Teacher.');
                            }
                           
                        }else{
                              return sendSuccess(data, res, 200, "teacher created successfully.");
                        }
                    
                       })

                       
   // teacher addres start
   console.log(newTeacher._id);               
   let teacherAddressData={
       teacherId:newTeacher._id
   }
   let newTeacherAddress = new TeacherAddress(teacherAddressData);
   newTeacherAddress.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher address end

          
   // teacher education start
   console.log(newTeacher._id);               
   let educationData={
       teachersid:newTeacher._id
   }
   let newEducation = new Education(educationData);
   newEducation.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher education end


   // teacher idproof start
   console.log(newTeacher._id);               
   let idproofData={
       teacherId:newTeacher._id
   }
   let newIdproof = new Idproof(idproofData);
   newIdproof.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher idproof end



   // teacher certification start
   console.log(newTeacher._id);               
   let certificationData={
       teachersid:newTeacher._id
   }
   let newCertification = new Certification(certificationData);
   newCertification.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher certification end


   // teacher experience start
   console.log(newTeacher._id);               
   let experienceData={
       teachersId:newTeacher._id
   }
   let newExperience = new Experience(experienceData);
   newExperience.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher experience end


   // teacher feature start
   console.log(newTeacher._id);               
   let featureData={
       teachersid:newTeacher._id
   }
   let newFeature = new Feature(featureData);
   newFeature.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher feature end

   // teacher galleryimage start
   console.log(newTeacher._id);               
   let galleryimageData={
       teachersid:newTeacher._id
   }
   let newGalleryimage = new Galleryimage(galleryimageData);
   newGalleryimage.save(async (err, data) => {
   
   
   
       if(err){
           console.log("err",err)
           if(err.code==11000){
               return sendCustomError({}, res, 500, 'teacher address already exists.');
           }else{
                return sendCustomError({}, res, 500, 'Error  in adding teacher address.');
           }
          
       }else{
           
   
            return sendSuccess(data, res, 200, "teacher address created successfully.");
       }
   
      })   
//    teacher galleryimage end





                       // newTeacher.save(async (err, data) => {
                //     console.log("teacherSave",data)
                // });

               }
               
               else if (userDetails.roleId.name=="STUDENT"){
                let studentData={
                    userid:userDetails._id
                }
                let newStudent = new Student(studentData);
                newStudent.save(async (err, data) => {

             

                    if(err){
                        console.log("err",err)
                        if(err.code==11000){
                            return sendCustomError({}, res, 500, 'student already exists.');
                        }else{
                             return sendCustomError({}, res, 500, 'Error in adding student.');
                        }
                       
                    }else{
                        

                         return sendSuccess(data, res, 200, "student created successfully.");
                    }
                
                   })

                                  
   // student addres start
console.log(newStudent._id);               
let studentAddressData={
    studentId:newStudent._id
}
let newStudentAddress = new StudentAddress(studentAddressData);
newStudentAddress.save(async (err, data) => {



    if(err){
        console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'student address already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error  in adding student address.');
        }
       
    }else{
        

         return sendSuccess(data, res, 200, "student address created successfully.");
    }

   })
// studentaddress end
               }
             



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
            let token = await genrateUserToken({ email: userDetails.email, userid: userDetails.id,roleId:userDetails.roleId });
               
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
    res.send('forget password function is commented');
//    let data = await User.findOne({number:req.body.mobileNumber});
//    const response={};
//    if(data){
//     let otpCode=Math .floor((Math.random()*10000)+1);
//     let otpData=new otp({
//         mobileNumber:req.body.mobileNumber,
//         code:optCode,
       
//     })
    
//     let otpResponse=await otpData.save();
//     responseType.statusText='success'
//     responseType.message ='please check your mobileNumber'
//    }
//    else{
//      responseType.statusText='error'
//     responseType.message ='Not found this mobileNumber'
//    }



  
   
}



const testFunction = async (req, res) => {
    res.send('hello world!');
    console.log("test function");
    return sendSuccess({}, {}, 200, "Logged in successfully.");
 }





module.exports = {
    register,
    login,
    forgotPassword,
    testFunction
};
