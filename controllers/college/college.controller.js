const { College, ObjectId } = require('../../models/college');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

const create = async (req, res) => {
let {name,image,description,contact_no,contact_email,contact_person,established_in,affiliation,banner,address,type,status} =  req.body;
    let slug=slugify(name.toLowerCase().trim());
  let requestData={name,image,description,contact_no,contact_email,contact_person,established_in,affiliation,banner,address,type,status};
  let conditions={};

  if(requestData.name){

    conditions={name: { $regex: '.*' + requestData.name + '.*' }};

}
let countData= await  College.count(conditions);

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
  let newCollege = new College(requestData);

   newCollege.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'College already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding college.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "College created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {college_id}=     req.params;
     const collegeDetails = await College.findOne({ _id: college_id});

     if(collegeDetails)
          return sendSuccess(collegeDetails, res, 200, "College details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching college details.")

}

const update = async (req, res) => {
 let {name,image,description,contact_no,contact_email,contact_person,established_in,affiliation,banner,address,type,status}= req.body;
   let {college_id}=req.params;
   let slug=slugify(name.toLowerCase().trim());
   try{
    const collegeDetails = await College.findOne({ _id: college_id});
    if(collegeDetails){
        if(collegeDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(categoryDetails.image && collegeDetails.image!="" && collegeDetails.image!==image){
                    unlink(collegeDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(collegeDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(collegeDetails.banner && collegeDetails.banner!="" && collegeDetails.banner!==banner){
                    unlink(collegeDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let college = await College.findOneAndUpdate({ _id: ObjectId(collegeDetails.id) },
                { $set: {name,image,description,contact_no,contact_email,contact_person,established_in,affiliation,banner,address,type,status} },
                { new: true });
           
            return sendSuccess(college, res, 200, "College updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating college.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating college.")
   }

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

    if(search_text.length>0 && status.length>0){

        conditions={ status:status ,name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(status.length>0 && search_text.length==0 ){
       
        conditions={status:status }
     }
     if(status.length==0 && search_text.length>0 ){
       
        conditions={name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' } }
     }

    let total_records= await College.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    College.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Colleges list.");
       
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

    College.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
       return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {college_id}=     req.params;
     const collegeDetails = await College.findOne({ _id: college_id});

     if(collegeDetails){
        await College.remove({ _id: college_id});

        return sendSuccess(collegeDetails, res, 200, "College deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting college.")
     }
      
     

}


module.exports = {
    create,
    view,
    update,
    listAll,
    destroy,
    search

};