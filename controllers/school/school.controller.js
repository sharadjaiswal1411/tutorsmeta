const { School , ObjectId} = require('../../models/school');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

 
const create = async (req, res) => {
    
let {name ,banner,image,description,metaTitle,metaDescription,status} = req.body;
let slug=slugify(name.toLowerCase().trim());

  let requestData={name ,slug,banner,image,description,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.name){

    conditions={name:  { $regex: '.*' + requestData.name + '.*' }
    };

}
let countData= await  School.countDocuments(conditions);

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
  let newSchool = new School(requestData);

   newSchool.save(async (err, data) => {
    if(err){
        console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'School already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding School.');
        }
       
    }else{
          return sendSuccess(data, res, 200, "School created successfully.");
    }

   })
}
 

const view = async(req,res) =>{
    let{school_id} = req.params;
    let schoolDetails = await School.findOne({_id:school_id}).populate('branch',{ title: 1,_id:1 }).populate('parent', { title: 1,_id:1 });
    if(schoolDetails)
        return sendSuccess({schoolDetails}, res, 200, "schoolDetails");
    else
        return sendCustomError({}, res, 500, "Error in fetching school")
}


const update =async(req, res) =>{
let {name,banner,image,description,metaTitle,metaDescription,status}= req.body;
   let {school_id}=req.params;
   if(name)
    {  let slug=slugify(name.toLowerCase().trim());}
   try{
    const schoolDetails = await School.findOne({ _id: school_id});
    if(schoolDetails){
        if(schoolDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(schoolDetails.image && schoolDetails.image!="" && schoolDetails.image!==image){
                    unlink(schoolDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(schoolDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(schoolDetails.banner && schoolDetails.banner!="" && schoolDetails.subbanner!==banner){
                    unlink(schoolDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let school = await School.findOneAndUpdate({ _id: ObjectId(schoolDetails.id) },
                { $set: {name,banner,image,description,metaTitle,metaDescription,status} },
                { new: true });
            return sendSuccess(school, res, 200, "school updated successfully.");
    }else{ 
            return sendCustomError({}, res, 500, "Error in updating School.")
    } 
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating School.")
   }
}



const destroy = async(req, res) =>{
let {school_id} = req.params;

const schoolDetails = await School.findOne({_id:school_id});
   if(schoolDetails){
   	await School.deleteOne({_id:school_id});
   return sendSuccess(schoolDetails, res, 200, "school deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error in deleting school")
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

    let total_records= await School.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    School.find(conditions).populate("branch", { title: 1,_id:1 }).limit(per_page).skip(offset).sort(order_by).then(results => {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "school list."); 
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
    School.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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