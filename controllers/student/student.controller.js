const {Student, ObjectId} = require('../../models/student');
const {sendCustomError, sendSuccess} = require('../../helper/response');
const { genrateStudentToken } = require('../../middlewares/auth-student');
const bcrypt = require('bcryptjs');
const { PASSWORD } = require('../../constant/common');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async(req,res) =>{
let {userid,about,board,school,college,subcategory,cityId,created_at,updated_at,status
} =  req.body;
let slug=slugify(userid.toLowerCase().trim());
       

  let requestData={userid,slug,about,board,school,college,subcategory,cityId,created_at,updated_at,status
  };
  let conditions={};
//   if(requestData.userid){
//     conditions={userid: { $regex: '.*' + requestData.userid + '.*' }};
// }
// let countData= await  Student.count(conditions);

// if(countData==0){
//     if (requestData.image) {
//         try{
//             requestData['image']=  await uploadFile(requestData.image, slug);
//         } 
//       catch(e){
//         requestData['image']=null;
//       }
//     }
//  }
  let newStudent = new Student(requestData);
   
   newStudent.save(async (err, data) => {
   
    if(err){
      
        if(err.code==11000){
           
            return sendCustomError({}, res, err.code, 'Student already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding student.')
        }
       
    }else{
       
     return sendSuccess(data, res, 200, "Student created successfully.");
    }

   })

}



const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const studentDetails = await Student.findOne({ email })
        if (!studentDetails) {
            return sendCustomError({}, res, 401, 'Student not found!')
        }
        const isMatchPassword = await studentDetails.isValidPassword(res, password);
        if (!isMatchPassword) {

            return sendCustomError({}, res, 200, 'Email/Password not matched!');
        }
        if (studentDetails) {
            let token = await genrateStudentToken({ email: studentDetails.email, studentId: studentDetails.id});
              
            let student = await Student.findOneAndUpdate({ _id: ObjectId(studentDetails.id) },
                { $set: { accessToken: token } },
                { new: true });
              
              let responseData=studentDetails.toJSON(); 
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






const update = async(req,res) =>{
let {userid,about,board,school,college,subcategory,cityId,created_at,updated_at,status
}=req.body;
let slug=slugify(userid.toLowerCase().trim());
let {student_id} = req.params;
try{
	const studentDetails = await Student.findOne({_id:student_id});
	if(studentDetails){
        // if(studentDetails.image!==image){
        //     try{
        //         image = await uploadFile(image, slug);
        //         if(studentDetails.image && studentDetails.image!="" && studentDetails.image!==image){
        //             unlink(studentDetails.image, (err) => {
        //                 if (err) 
        //                  console.log(err);
        //             });
        //         }
        //     } 
        //   catch(e){
        //     image=image;
        //   }
        // }
        let student = await Student.findOneAndUpdate({_id:ObjectId(studentDetails.id)},
        {$set: {userid,slug,about,board,school,college,subcategory,cityId,created_at,updated_at,status
        }},
        {new: true});

        return sendSuccess(student, res, 200, "Student updated successfully")
	}else{

		return sendCustomError({},res, 500, "Error in upadating student")
	}

}
catch(e){
	return sendCustomError({}, res, e.code, 500, "Error in updatin student")
}
	
}
const destroy = async(req,res) =>{
let {student_id}=     req.params;
     const studentDetails = await Student.findOne({ _id: student_id});

     if(studentDetails){
        await Student.remove({ _id: student_id});

        return sendSuccess(studentDetails, res, 200, "Students deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting student.")
     }
      
     

	
}
const view = async (req, res) => {
 let {student_id}=     req.params;
     const studentDetails = await Student.findOne({ _id: student_id}).populate('courses',{title:1,_id:1}).populate('college',{userid:1,_id:1});

     if(studentDetails)
          return sendSuccess(studentDetails, res, 200, "Students details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching student details.")

}
const listAll = async (req, res) => {
  
    let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
     let status= (req.query.status)?req.query.status:"";
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

    if(status.length>0 && search_text.length>0 ){
       
        conditions={status:status , name: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }

    if(status.length>0 && search_text.length==0){
       conditions={status:status}

    }

    if(search_text.length>0 && status.length==0){

        conditions={name: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }


    let total_records= await Student.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Student.find(conditions).populate("userid").limit(per_page).skip(offset).sort(order_by).then(results => {
        
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Students list.");
       
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

        conditions={status:'ACTIVE', userid: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

    }

    Student.find(conditions,{_id:1,userid:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
       return res.status(200).json(results);
       
    });
  
}


  module.exports= {
		create,
        login,
		update,
		destroy,
		view,
    listAll,
    search

};