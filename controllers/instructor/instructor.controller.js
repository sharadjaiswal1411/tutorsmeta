const {Instructor, ObjectId} = require('../../models/instructor');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const { genrateInstructorToken } = require('../../middlewares/auth-instructor');
const bcrypt = require('bcryptjs');
const { Otp } = require('../../models/otp');
const { PASSWORD } = require('../../constant/common');
const { sendMail } = require('../../email/email');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async (req, res) => {
    
let {name,email,phone,image,address,featured,salary,designation,experience,about,employementType,
      metaTitle,metaDescription,status} = req.body;
      let slug=slugify((name+ new Date().getTime()).toLowerCase().trim()); 
    
   


  let requestData={name,email,phone,image,address,featured,salary,designation,experience,about,employementType,
                    metaTitle,metaDescription,status};
        let conditions={};
        if(requestData.email){
            conditions={email: { $regex: '.*' + requestData.email + '.*' }};
        }
        let countData= await  Instructor.count(conditions);
        
        if(countData==0){
            if (requestData.image) {
                try{
                    requestData['image']=  await uploadFile(requestData.image, slug);
                } 
            catch(e){
                requestData['image']=null;
            }
            }
        }
  let newInstructor = new Instructor(requestData);

   newInstructor.save(async (err, data) => {
    if(err){
          console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Instructor already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding instructor.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Instructor created successfully.");
    
    }

   })


}


const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const instructorDetails = await Instructor.findOne({ email })
        if (!instructorDetails) {
            return sendCustomError({}, res, 401, 'Instructor not found!')
        }
        const isMatchPassword = await instructorDetails.isValidPassword(res, password);
        if (!isMatchPassword) {

            return sendCustomError({}, res, 200, 'Email/Password not matched!');
        }
        if (instructorDetails) {
            let token = await genrateInstructorToken({ email: instructorDetails.email, instructorId: instructorDetails.id});
              
            let instructor = await Instructor.findOneAndUpdate({ _id: ObjectId(instructorDetails.id) },
                { $set: { accessToken: token } },
                { new: true });
              
              let responseData=instructorDetails.toJSON(); 
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





const view = async(req,res) =>{
    let {instructor_id}=     req.params;
     const instructorDetails = await Instructor.findOne({ _id: instructor_id});

     if(instructorDetails)
          return sendSuccess(instructorDetails, res, 200, "Instructors details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching instructor details.")
}

const update =async(req, res) =>{
let {name,email,phone,image,address,featured,salary,designation,experience,about,employementType,
 metaTitle,metaDescription,status}= req.body;
   let {instructor_id}=req.params;
   let slug=slugify((name+ new Date().getTime()).toLowerCase().trim());
   try{
    const instructorDetails = await Instructor.findOne({ _id: instructor_id});
    if(instructorDetails){
        if(instructorDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(instructorDetails.image && instructorDetails.image!="" && instructorDetails.image!==image){
                    unlink(instructorDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }
            let instructor = await Instructor.findOneAndUpdate({ _id: ObjectId(instructorDetails.id) },
                { $set: {name,email,phone,image,featured,address,salary,designation,experience,about,employementType,
                          metaTitle,metaDescription,status } },
                { new: true });
           
            return sendSuccess(instructor, res, 200, "Instructor updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating instructor.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating instructor.")
   }
}

const destroy = async(req, res) =>{
let {instructor_id} = req.params;

const instructorDetails = await Instructor.findOne({_id:instructor_id});
   if(instructorDetails){
    await Instructor.remove({_id:instructor_id});
   return sendSuccess(instructorDetails, res, 200, "Instructor deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting Instructor")
}
}

const listAll =async(req,res) =>{
    console.log(req.query);
    let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
    let status=(req.query.status)?req.query.status:"";
    
    let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['_id']=-1;
    }
    let per_page= parseInt((req.query.per_page)?req.query.per_page:20);
    let offset=parseInt((current_page-1)*per_page);
    let conditions={};

    if(search_text.length>0 && status.length>0){

        conditions={ status:status ,name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(status.length>0 && search_text.length==0 ){
       
        conditions={status:status }
     }
     if(status.length==0 && search_text.length>0 ){
       
        conditions={name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' } }
     }


    let total_records= await Instructor.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Instructor.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Instructors list.");
       
    });


    
}
const search = async (req, res) => {
   
    let search_text= (req.query.q)?req.query.q:"";
    let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['name']=1;
    }
    let conditions={status:'ACTIVE'};

    if(search_text.length>0){

        conditions={status:'ACTIVE', name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Instructor.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });

}

module.exports = {

    create,
    login,
    update,
    view,
    listAll,
    destroy,
    search
}