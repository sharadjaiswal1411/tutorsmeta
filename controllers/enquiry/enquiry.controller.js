const { Enquiry, ObjectId } = require('../../models/enquiry');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {
  let {course,student,followDate,nextDate,reason,status}= req.body;
  
  
  let requestData={course,student,followDate,nextDate,reason,status};

  let newEnquiry = new Enquiry(requestData);

  newEnquiry.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Enquiry already exists.')
        }else{
             return sendCustomError({}, res, err.code, 'Error in adding enquiry.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Enquiry created successfully.");
    }

   })

}



const view = async (req, res) => {
let {enquiry_id}=     req.params;
     const enquiryDetails = await Enquiry.findOne({ _id: enquiry_id}).populate('course',{ title: 1,_id:1 }).populate('student',{name:1,_id:1});

     if(enquiryDetails)
          return sendSuccess(enquiryDetails, res, 200, "Enquiry details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching enquiry details.")

}

const update = async (req, res) => {
   let {course,student,followDate,nextDate,reason,status}=     req.body;
   let {enquiry_id}=     req.params;
   try{
    
    const enquiryDetails = await Enquiry.findOne({ _id: enquiry_id});
    if(enquiryDetails){
           
            let enquiry = await Enquiry.findOneAndUpdate({ _id: ObjectId(enquiryDetails.id) },
                { $set: { course,student,followDate,nextDate,reason,status } },
                { new: true });
           
            return sendSuccess(enquiry, res, 200, "Enquiry updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, e.code, "Error in updating enquiry.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating enquiry.")
   }
   

 //  if(roleDetails)
  

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

        conditions={ status:status ,course: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(search_text.length==0 && status.length>0){

        conditions={ status:status};

    }
     if(search_text.length>0 && status.length==0){

        conditions={course: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    let total_records= await Enquiry.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Enquiry.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Enquiries list.");
       
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
            order_by['course']=1;
    }
  
   let conditions={};

   if(search_text.length>0){

       conditions={ course: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

   }


   

   Enquiry.find(conditions,{_id:1,course:1,sort:order_by},  function(err, results) {
       // let data={
       //     'results':results,
           
       // }
       return res.status(200).json(results);
      
   });

   
}


const destroy = async (req, res) => {
 let {enquiry_id}=     req.params;
     const enquiryDetails = await Enquiry.findOne({ _id: enquiry_id});

     if(enquiryDetails){
        await Enquiry.remove({ _id: enquiry_id});

        return sendSuccess(enquiryDetails, res, 200, "Enquiry deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting enquiry.")
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