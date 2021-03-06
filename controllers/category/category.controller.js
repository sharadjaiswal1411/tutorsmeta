const {Category, ObjectId} = require('../../models/category');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async (req, res) => {
    
let {branch,parent,title,banner,featured,image,description,metaTitle,metaDescription,status} = req.body;
let slug=slugify(title.toLowerCase().trim());

  let requestData={branch,parent,featured,title,slug,banner,image,description,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
let countData= await  Category.count(conditions);

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
  let newCategory = new Category(requestData);

   newCategory.save(async (err, data) => {
    if(err){
        console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Category already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding category.');
        }
       
    }else{
          return sendSuccess(data, res, 200, "Category created successfully.");
    }

   })
}
 

const view = async(req,res) =>{
    let{category_id} = req.params;
    let categoryDetails = await Category.findOne({_id:category_id}).populate('branch',{ title: 1,_id:1 }).populate('parent', { title: 1,_id:1 });
    if(categoryDetails)
        return sendSuccess({categoryDetails}, res, 200, "Category Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching category")
}


const update =async(req, res) =>{
let {branch,parent,title,banner,image,featured,description,metaTitle,metaDescription,status}= req.body;
   let {category_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const categoryDetails = await Category.findOne({ _id: category_id});
    if(categoryDetails){
        if(categoryDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(categoryDetails.image && categoryDetails.image!="" && categoryDetails.image!==image){
                    unlink(categoryDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(categoryDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(categoryDetails.banner && categoryDetails.banner!="" && categoryDetails.banner!==banner){
                    unlink(categoryDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let category = await Category.findOneAndUpdate({ _id: ObjectId(categoryDetails.id) },
                { $set: {branch,parent,title,banner,featured,image,description,metaTitle,metaDescription,status } },
                { new: true });
            return sendSuccess(category, res, 200, "Category updated successfully.");
    }else{ 
            return sendCustomError({}, res, 500, "Error in updating category.")
    } 
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating category.")
   }
}



const destroy = async(req, res) =>{
let {category_id} = req.params;

const categoryDetails = await Category.findOne({_id:category_id});
   if(categoryDetails){
   	await Category.remove({_id:category_id});
   return sendSuccess(categoryDetails, res, 200, "Category deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting category")
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
       
        conditions={status:status }
     }

     if(status.length==0 && search_text.length>0 ){
       
        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' } }
     }

    let total_records= await Category.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Category.find(conditions).populate("branch", { title: 1,_id:1 }).limit(per_page).skip(offset).sort(order_by).then(results => {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Categories list."); 
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
    Category.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
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