const { Faq, ObjectId } = require('../../models/faq');
const  slugify = require('slugify');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');


const create = async (req, res) => {
let {course,title,image,answer,status} =  req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={course,title,image,answer,status};
  let conditions={};
  if(requestData.title){
    conditions={title: { $regex: '.*' + requestData.title + '.*' }};
}
let countData= await  Faq.count(conditions);

if(countData==0){
    if (requestData.image) {
        try{
            requestData['image']=  await uploadFile(requestData.image, slug);
        } 
      catch(e){
        requestData['image']=null;
      }
    }
 }
  let newFaq = new Faq(requestData);

   newFaq.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Faq already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding faq.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Faq created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {faq_id}=     req.params;
     const faqDetails = await Faq.findOne({ _id: faq_id}).populate('course',{title:1,_id:1});

     if(faqDetails)
          return sendSuccess(faqDetails, res, 200, "Faq details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching faq details.")

}

const update = async (req, res) => {
 let {course,title,image,answer,status}= req.body;
   let {faq_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const faqDetails = await Faq.findOne({ _id: faq_id});
    if(faqDetails){
        if(faqDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(faqDetails.image && faqDetails.image!="" && faqDetails.image!==image){
                    unlink(faqDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }
            let city = await Faq.findOneAndUpdate({ _id: ObjectId(faqDetails.id) },
                { $set: { course,title,image,answer,status} },
                { new: true });
           
            return sendSuccess(city, res, 200, "Faq updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating faq.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating faq.")
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

        conditions={status:status, title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(search_text.length==0 && status.length>0){

        conditions={status:status };

    }
    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Faq.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Faq.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Faqs list.");
       
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

    Faq.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {faq_id}=     req.params;
     const faqDetails = await Faq.findOne({ _id: faq_id});

     if(faqDetails){
        await Faq.remove({ _id: faq_id});

        return sendSuccess(faqDetails, res, 200, "Faqs deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting faq.")
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