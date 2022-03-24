const { Internship, ObjectId } = require('../../models/internship');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const  slugify = require('slugify');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');




const create = async (req, res) => {
let {branch,category,company,city,title,location,banner,image,description,duration,stipend,
      skills,instructions,responsibility,benefits,paytype,type,metaTitle,metaDescription,status} =  req.body;
        let slug=slugify(title.toLowerCase().trim());
 
  let requestData={branch,category,company,city,title,slug,location,banner,image,description,duration,stipend,
      skills,instructions,responsibility,benefits,paytype,type,metaTitle,metaDescription,status};
     let conditions={};
     if(requestData.title){
      
          conditions={title: { $regex: '.*' + requestData.title + '.*' }};
      
      }
      let countData= await  Internship.count(conditions);
        
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

  let newInternship = new Internship(requestData);

   newInternship.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Internship already exists.')
        }else{
            console.log(err)
             return sendCustomError({}, res, 500, 'Error in adding internship.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Internship created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {internship_id}=     req.params;
     const internshipDetails = await Internship.findOne({ _id: internship_id}).populate('category',{title:1,_id:1}).populate('company',{name:1,_id:1}).populate('branch',{title:1,_id:1}).populate('skills',{title:1,_id:1}).populate('city',{title:1,_id:1});

     if(internshipDetails)
          return sendSuccess(internshipDetails, res, 200, "Internships details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching internship details.")

}

const update = async (req, res) => {
 let {branch,category,company,city,title,location,banner,image,description,duration,stipend,
      skills,instructions,responsibility,benefits,paytype,type,metaTitle,metaDescription,status}= req.body;
   let {internship_id}=req.params;
    let slug=slugify(title.toLowerCase().trim());
   try{
    const internshipDetails = await Internship.findOne({ _id: internship_id});
    if(internshipDetails){
        if(internshipDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(internshipDetails.image && internshipDetails.image!="" && internshipDetails.image!==image){
                    unlink(internshipDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(internshipDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(internshipDetails.banner && internshipDetails.banner!="" && internshipDetails.banner!==banner){
                    unlink(internshipDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
           
            let internship = await Internship.findOneAndUpdate({ _id: ObjectId(internshipDetails.id) },
                { $set: { branch,category,company,city,title,location,banner,image,description,duration,stipend,
      skills,instructions,responsibility,benefits,paytype,type,metaTitle,metaDescription,status} },
                { new: true });
           
            return sendSuccess(internship, res, 200, "Internship updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating internship.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating internship.")
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

        conditions={status:status ,title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
     if(search_text.length==0 && status.length>0){

        conditions={status:status};

    }
    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Internship.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Internship.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Internships list.");
       
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Internship.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {internship_id}=     req.params;
     const internshipDetails = await Internship.findOne({ _id: internship_id});

     if(internshipDetails){
        await Internship.remove({ _id: internship_id});

        return sendSuccess(internshipDetails, res, 200, "Internship deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting otp.")
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