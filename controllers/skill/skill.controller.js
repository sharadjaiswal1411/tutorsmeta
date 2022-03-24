const { Skill, ObjectId } = require('../../models/skill');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');

const create = async (req, res) => {
let {title,description,status,image,metaTitle,metaDescription} =  req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={title,slug,description,image,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
 let countData= await  Skill.count(conditions);
     if(countData==0){
        if (requestData.image) {
            try{
                requestData['image']=  await uploadFile(requestData.image, slug);
                
            } 
          catch(e){
            requestData['image']=null;
            // console.log("elseimage",requestData);
          }
        }}
  let newSkill = new Skill(requestData);

   newSkill.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Skill already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding skill.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Skill created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {skill_id}=     req.params;
     const skillDetails = await Skill.findOne({ _id: skill_id});

     if(skillDetails)
          return sendSuccess(skillDetails, res, 200, "Skill details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching skill details.")

}

const update = async (req, res) => {
 let {title,description,status,image,metaTitle,metaDescription}= req.body;
 let slug=slugify(title.toLowerCase().trim());
   let {skill_id}=req.params;

   try{
    const skillDetails = await Skill.findOne({ _id: skill_id});
    if(skillDetails){
           if(skillDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(skillDetails.image && skillDetails.image!="" && skillDetails.image!==image){
                    unlink(skillDetails.image, (err) => {
                        if (err) 
                        
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
            let skill = await Skill.findOneAndUpdate({ _id: ObjectId(skillDetails.id) },
                { $set: {title,description,status,image,metaTitle,metaDescription} },
                { new: true });
           
            return sendSuccess(skill, res, 200, "Skill updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating skill.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating skill.")
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

   if(status.length>0 && search_text.length>0 ){
       
        conditions={status:status , title: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }

    if(status.length>0 && search_text.length==0){
       conditions={status:status}

    }

    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }

    let total_records= await Skill.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Skill.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Skills list.");
       
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
    let conditions={};

    if(search_text.length>0){

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

    }

    Skill.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
         return res.status(200).json(results);
    });
  
}


const destroy = async (req, res) => {
 let {skill_id}=     req.params;
     const skillDetails = await Skill.findOne({ _id: skill_id});

     if(skillDetails){
        await Skill.remove({ _id: skill_id});

        return sendSuccess(skillDetails, res, 200, "Skills deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting skill.")
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