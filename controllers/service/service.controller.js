const {Service, ObjectId} = require('../../models/service');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {title,banner,image,description,type,metaTitle,metaDescription,status} = req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={title,slug,banner,image,type,description,metaTitle,metaDescription,status};
   let conditions={};
   if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
let countData= await  Service.count(conditions);
if(countData==0){
        if (requestData.image) {
            try{
                requestData['image']=  await uploadFile(requestData.image, slug);
                // console.log("ifimage",requestData);
            } 
          catch(e){
            requestData['image']=null;
            // console.log("elseimage",requestData);
          }
        }
        // if(requestData.banner)
        if (requestData.banner) {
            try{
                
                requestData['banner']=  await uploadFile(requestData.banner, slug+'-banner');
                console.log("ifbanner",requestData);
            } 
          catch(e){
            requestData['banner']=null;
            // console.log("elsebanner",requestData);
          }
        }
     }
  let newService = new Service(requestData);


   newService.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Service already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding service.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Service created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {service_id}=     req.params;
     const serviceDetails = await Service.findOne({ _id: service_id});

     if(serviceDetails)
          return sendSuccess(serviceDetails, res, 200, "Service details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching service details.")
}

const update =async(req, res) =>{
let {title,banner,image,description,type,metaTitle,metaDescription,status}= req.body;

   let {service_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const serviceDetails = await Service.findOne({ _id: service_id});
    if(serviceDetails){
           if(serviceDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(serviceDetails.image && serviceDetails.image!="" && serviceDetails.image!==image){
                    unlink(serviceDetails.image, (err) => {
                        if (err) 
                        //throw err;
                         console.log(err);
                    });
                }

                // console.log("ifimage",programDetails);
            } 
          catch(e){
            image=image;
            // console.log("elseimage",programDetails);
          }
        }
        if(serviceDetails.banner!==banner){
            try{
                banner = await uploadFile(banner, slug);
                if(serviceDetails.banner && serviceDetails.banner!="" && serviceDetails.banner!==banner){
                    unlink(serviceDetails.banner, (err) => {
                        if (err) 
                        //throw err;
                         console.log(err);
                    });
                }

                // console.log("ifimage",programDetails);
            } 
          catch(e){
            banner=banner;
            // console.log("elseimage",programDetails);
          }
        }
            let service = await Service.findOneAndUpdate({ _id: ObjectId(serviceDetails.id) },
                { $set: {title,banner,image,description,type,metaTitle,metaDescription,status} },
                { new: true });
           
            return sendSuccess(service, res, 200, "Service updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating service.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating service.")
   }
}

const destroy = async(req, res) =>{
let {service_id} = req.params;

const serviceDetails = await Service.findOne({_id:service_id});
   if(serviceDetails){
    await Service.remove({_id:service_id});
   return sendSuccess(serviceDetails, res, 200, "Service deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting service")
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

    if(status.length>0 && search_text.length==0){
       conditions={status:status}

    }

    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }


    let total_records= await Service.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Service.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Sections list.");
       
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
            order_by['title']=1;
    }
    let conditions={status:'ACTIVE'};

    if(search_text.length>0){

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

    }

    Service.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });
  
}




module.exports = {

    create,
    update,
    view,
    listAll,
    destroy,
    search
}