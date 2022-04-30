const { SubCategory, ObjectId} = require('../../models/subcategory');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

 
const create = async (req, res) => {
    
let {name,categoryId,banner,image,description,metaTitle,metaDescription,status} = req.body;
let slug=slugify(name.toLowerCase().trim());

  let requestData={name,categoryId,slug,banner,image,description,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.name){

    conditions={name:  { $regex: '.*' + requestData.name + '.*' }
    };

}
let countData= await  SubCategory.countDocuments(conditions);

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
  let newSubCategory = new SubCategory(requestData);

   newSubCategory.save(async (err, data) => {
    if(err){
        console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'SubCategory already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding subcategory.');
        }
       
    }else{
          return sendSuccess(data, res, 200, "SubCategory created successfully.");
    }

   })
}
 

const view = async(req,res) =>{
    let{subcategory_id} = req.params;
    let subcategoryDetails = await SubCategory.findOne({_id:subcategory_id}).populate('branch',{ title: 1,_id:1 }).populate('parent', { title: 1,_id:1 });
    if(subcategoryDetails)
        return sendSuccess({subcategoryDetails}, res, 200, "SubCategory Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching subcategory")
}


const update =async(req, res) =>{
let {name,categoryId,banner,image,description,metaTitle,metaDescription,status}= req.body;
   let {subcategory_id}=req.params;
   if(name)
    {  let slug=slugify(name.toLowerCase().trim());}
   try{
    const subcategoryDetails = await SubCategory.findOne({ _id: subcategory_id});
    if(subcategoryDetails){
        if(subcategoryDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(subcategoryDetails.image && subcategoryDetails.image!="" && subcategoryDetails.image!==image){
                    unlink(subcategoryDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(subcategoryDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(subcategoryDetails.banner && subcategoryDetails.banner!="" && subcategoryDetails.subbanner!==banner){
                    unlink(subcategoryDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let subcategory = await SubCategory.findOneAndUpdate({ _id: ObjectId(subcategoryDetails.id) },
                { $set: {name,categoryId,banner,image,description,metaTitle,metaDescription,status} },
                { new: true });
            return sendSuccess(subcategory, res, 200, "SubCategory updated successfully.");
    }else{ 
            return sendCustomError({}, res, 500, "Error in updating subcategory.")
    } 
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating subcategory.")
   }
}



const destroy = async(req, res) =>{
let {subcategory_id} = req.params;

const subcategoryDetails = await SubCategory.findOne({_id:subcategory_id});
   if(subcategoryDetails){
   	await SubCategory.deleteOne({_id:subcategory_id});
   return sendSuccess(subcategoryDetails, res, 200, "SubCategory deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting subcategory")
}
}


const listAll =async(req, res) =>{
let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
    let category= (req.query.category)?req.query.category:"";

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
     if(status.length>0 && search_text.length==0 && category.length==0 ){
       
        conditions={status:status.toUpperCase()}
     }
     if(status.length==0 && search_text.length==0 && category.length>0 ){
        console.log(category)
         conditions={categoryId: category}
      }

     if(status.length==0 && search_text.length>0  && category.length==0 ){
       
        conditions={name: { $regex: '.*' + search_text + '.*','$options' : 'i' } }
     }

    let total_records= await SubCategory.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    SubCategory.find(conditions).populate("categoryId", { name: 1,_id:1 }).limit(per_page).skip(offset).sort(order_by).then(results => {
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
    SubCategory.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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