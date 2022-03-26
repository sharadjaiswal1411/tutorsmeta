const {Branch, ObjectId} = require('../../models/branch');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async (req, res) => {
     
let {title,image,banner,description,metaTitle,metaDescription,status} = req.body;
  
  let slug=slugify(title.toLowerCase().trim());
  let requestData={title,slug,image,banner,description,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
 let countData= await  Branch.count(conditions);
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
    //  console.log("countData",countData)
     let newBranch = new Branch(requestData);
   newBranch.save(async (err, data) => {
    if(err){
      
        if(err.code==11000){
            return sendCustomError({}, res, 422, 'Branch already exists.')
        }else{
             console.log(err)
             return sendCustomError({}, res, 500, 'Error in adding branch.')
        }
       
    }else{
        // console.log(data.image);
       
          return sendSuccess(data, res, 200, "Branch created successfully.");
    
    }

   })



}


const view = async(req,res) =>{
    let{branch_id} = req.params;
   
    let branchDetails = await Branch.findOne({_id:branch_id});
    //  console.log("branchDetails",branchDetails)
    if(branchDetails)

        return sendSuccess({branchDetails}, res, 200, "Branch Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching branch")
}

const update =async(req, res) =>{
let {title,image,banner,description,metaTitle,metaDescription,status}= req.body;
   let {branch_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const branchDetails = await Branch.findOne({ _id: branch_id});


    if(branchDetails){
        
        if(branchDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(branchDetails.image && branchDetails.image!="" && branchDetails.image!==image){
                    unlink(branchDetails.image, (err) => {
                        if (err) 
                        //throw err;
                         console.log(err);
                    });
                }

                // console.log("ifimage",branchDetails);
            } 
          catch(e){
            image=image;
            // console.log("elseimage",branchDetails);
          }
        }

        if(branchDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(branchDetails.banner && branchDetails.banner!="" && branchDetails.banner!==banner){
                    unlink(branchDetails.banner, (err) => {
                        if (err) 
                        //throw err;
                        console.log('err',err);
                    });
                }
                // console.log("ifimage",branchDetails);
            } 
          catch(e){
          banner=banner;
            // console.log("elseimage",branchDetails);
          }
        }
           
            let branch = await Branch.findOneAndUpdate({ _id: ObjectId(branchDetails.id) },
                { $set: { title,image,banner,description,metaTitle,metaDescription,status} },
                { new: true });
           
            return sendSuccess(branch, res, 200, "Branch updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating branch.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating branch.")
   }
}

const destroy = async(req, res) =>{
let {branch_id} = req.params;

const branchDetails = await Branch.findOne({_id:branch_id});
   if(branchDetails){
   	await Branch.remove({_id:branch_id});
   return sendSuccess(branchDetails, res, 200, "Branch deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting branch")
}
}

const listAll =async( req,res) =>{
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
    
    let total_records= await Branch.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Branch.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Branchs list.");
       
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }

    Branch.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
       
        //  console.log("results",results)
       // return sendSuccess(data, res, 200, "Branch list.");

       return res.status(200).json(results);
       
    }).limit(7);
  
}



module.exports = {

	create,
	update,
	view,
	listAll,
	destroy,
    search
}