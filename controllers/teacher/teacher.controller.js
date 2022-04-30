const { Teacher, ObjectId} = require('../../models/teacher');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

 
const create = async (req, res) => {
    
let {userid,tagline,shortBio,about,emailVisible,mobileVisible,profileVisible,emailVerified,hourlyRate,teachingSince,cityId,created_at,updated_at,status} = req.body;
let slug=slugify(userid.toLowerCase().trim());

  let requestData={userid,slug,tagline,shortBio,about,emailVisible,mobileVisible,profileVisible,emailVerified,hourlyRate,teachingSince,cityId,created_at,updated_at,status};
  let conditions={};

  if(requestData.userid){

    conditions={name:  { $regex: '.*' + requestData.userid + '.*' }
    };

}
let countData= await  Teacher.countDocuments(conditions);

if(countData==0){
    if (requestData.image) {
        try{
            requestData['image']=  await uploadFile(requestData.image, slug);
        } 
      catch(e){
        requestData['image']=null;
      }
    }
    if (requestData.banner) {
        try{
            requestData['banner']=  await uploadFile(requestData.banner, slug+'-banner');
        } 
      catch(e){
        requestData['banner']=null;
      }
    }
 }
  let newTeacher = new Teacher(requestData);

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
}
 

const view = async(req,res) =>{
    let{teacher_id} = req.params;
    let teacherDetails = await Teacher.findOne({_id:teacher_id}).populate('branch',{ title: 1,_id:1 }).populate('parent', { title: 1,_id:1 });
    if(teacherDetails)
        return sendSuccess({teacherDetails}, res, 200, "teacher Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching teacher")
}


const update =async(req, res) =>{
let {userid,tagline,shortBio,about,emailVisible,mobileVisible,profileVisible,emailVerified,hourlyRate,teachingSince,cityId,created_at,updated_at,status}= req.body;

let {teacher_id} = req.params;


   if(userid)
    {  let slug=slugify(userid.toLowerCase().trim());}
   try{

    const teacherDetails = await Teacher.findOne({_id:teacher_id});
    if(teacherDetails){
        // if(teacherDetails.image!==image){
        //     try{
        //         image = await uploadFile(image, slug);
        //         if(teacherDetails.image && teacherDetails.image!="" && teacherDetails.image!==image){
        //             unlink(teacherDetails.image, (err) => {
        //                 if (err) 
        //                  console.log(err);
        //             });
        //         }
        //     } 
        //   catch(e){
        //     image=image;
        //   }
        // }

        // if(teacherDetails.banner!==banner){
        //     try{
        //         banner=  await uploadFile(banner, slug);
        //         if(teacherDetails.banner && teacherDetails.banner!="" && teacherDetails.subbanner!==banner){
        //             unlink(teacherDetails.banner, (err) => {
        //                 if (err) 
        //                 console.log('err',err);
        //             });
        //         }
        //     } 
        //   catch(e){
        //     banner=banner;
        //   }
        // }
            let teacher = await Teacher.findOneAndUpdate({ _id: ObjectId(teacherDetails.id) },
                { $set: {userid,tagline,shortBio,about,emailVisible,mobileVisible,profileVisible,emailVerified,hourlyRate,teachingSince,cityId,created_at,updated_at,status} },
                { new: true });
            return sendSuccess(teacher, res, 200, "teacher updated successfully.");
    }else{ 
            return sendCustomError({}, res, 500, "Error in updating Teacher.")
    } 
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Teacher .")
   }
}



const destroy = async(req, res) =>{
let {teacher_id} = req.params;

const teacherDetails = await Teacher.findOne({_id:teacher_id});
   if(teacherDetails){
   	await Teacher.deleteOne({_id:teacher_id});
   return sendSuccess(teacherDetails, res, 200, "teacher deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting teacher")
}
}


const listAll =async(req, res) =>{
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
       
        conditions={status:status , title: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }
     if(status.length>0 && search_text.length==0 ){
       
        conditions={title:status }
     }

     if(status.length==0 && search_text.length>0 ){
       
        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' } }
     }

    let total_records= await Teacher.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Teacher.find(conditions).populate("userid").limit(per_page).skip(offset).sort(order_by).then(results => {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "SubCategories list."); 
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};
    }
    Teacher.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results 
        // }
        // console.log("results",results)
        // return sendSuccess(data, res, 200, "Category list.");
        return res.status(200).json(results);
       
    }).limit(5);
  
}



module.exports = {

	create,
	update,
	view,
	listAll,
	destroy,
    search
}