const { Course, ObjectId } = require('../../../models/course');
const { sendCustomError, sendSuccess } = require('../../../helper/response');
const { env } = process;
const CryptoJS = require("crypto-js");


const view = async (req, res) => {
    let {slug}=     req.params;
     const courseDetails = await Course.findOne({ slug: slug});

     if(courseDetails){
        let original=JSON.stringify(courseDetails)
        let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();
        return sendSuccess(ciphertext, res, 200, "Course details.");
     }
          
     else
       return sendCustomError({}, res, 500, "Error in fetching course details.")

}



const listAll = async (req, res) => {
    let order_by={name:1};
    Course.find({'status':'ACTIVE'},{}, {sort:order_by }, function(err, results) {
    let original=JSON.stringify(results)
    let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();
        return sendSuccess(ciphertext, res, 200, "Course list.");
       
    });


}

module.exports = {
    view,
    listAll
};