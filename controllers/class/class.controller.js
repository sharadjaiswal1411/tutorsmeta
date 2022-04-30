const { Class , ObjectId} = require('../../models/class');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

 
const create = async (req, res) => {
    
let {name,subcategoryId,banner,image,description,metaTitle,metaDescription,status} = req.body;
let slug=slugify(name.toLowerCase().trim());

  let requestData={name,subcategoryId,slug,banner,image,description,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.name){

    conditions={name:  { $regex: '.*' + requestData.name + '.*' }
    };

}
let countData= await  Class.countDocuments(conditions);

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
  let newClass = new Class(requestData);

   newClass.save(async (err, data) => {
    if(err){
        console.log("err",err)
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Class already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding class.');
        }
       
    }else{
          return sendSuccess(data, res, 200, "class created successfully.");
    }

   })
}
 

const view = async(req,res) =>{
    let{class_id} = req.params;
    let classDetails = await Class.findOne({_id:class_id}).populate({path:"subcategoryId", select:{ name: 1,_id:1 ,categoryId:1},
    populate: {
        path: "categoryId", // in blogs, populate comments
        select:{ name: 1,_id:1 }
     }});
    if(classDetails)
        return sendSuccess({classDetails}, res, 200, "ClassDetails");
    else
        return sendCustomError({}, res, 500, "Error in fetching class")
}


const update =async(req, res) =>{
let {name ,subcategoryId,banner,image,description,metaTitle,metaDescription,status}= req.body;
   let {class_id}=req.params;
   if(name)
    {  let slug=slugify(name.toLowerCase().trim());}
   try{
    const classDetails = await Class.findOne({ _id: class_id});
    if(classDetails){
        if(classDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(classDetails.image && classDetails.image!="" && classDetails.image!==image){
                    unlink(classDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(classDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(classDetails.banner && classDetails.banner!="" && classDetails.subbanner!==banner){
                    unlink(classDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let subcategoryclass = await Class.findOneAndUpdate({ _id: ObjectId(classDetails.id) },
                { $set: {name ,subcategoryId,banner,image,description,metaTitle,metaDescription,status} },
                { new: true });
            return sendSuccess(subcategoryclass, res, 200, "class updated successfully.");
    }else{ 
            return sendCustomError({}, res, 500, "Error in updating Class.")
    } 
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Class.")
   }
}



const destroy = async(req, res) =>{
let {class_id} = req.params;

const classDetails = await Class.findOne({_id:class_id});
   if(classDetails){
   	await Class.deleteOne({_id:class_id});
   return sendSuccess(classDetails, res, 200, "class deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting class")
}
}


const listAll =async(req, res) =>{
let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
    let status= (req.query.status)?req.query.status:"";
    let subcategory= (req.query.subcategory)?req.query.subcategory:"";
    let category= (req.query.category)?req.query.category:"";
    
    // console.log(status);
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
       
        conditions={status:status.toUpperCase() , name: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }
     if(status.length>0 && search_text.length==0 && subcategory.length==0 && category.length==0){
       
        conditions={status:status.toUpperCase() }
     }

     if(status.length==0 && search_text.length>0 && subcategory.length==0 && category.length==0 ){
       
        conditions={name: { $regex: '.*' + search_text + '.*','$options' : 'i' } }
     }

     if(status.length==0 && search_text.length==0 && category.length==0 && subcategory.length>0 ){
       console.log(subcategory)
        conditions={subcategoryId: subcategory}
     }

    let total_records= await Class.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Class.find(conditions)
    .populate({path:"subcategoryId", select:{ name: 1,_id:1 ,categoryId:1},
    populate: {
        path: "categoryId", // in blogs, populate comments
        select:{ name: 1,_id:1 }
     }})
     .limit(per_page).skip(offset).sort(order_by).then(results => {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Class list."); 
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
    Class.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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