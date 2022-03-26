const {EventRegistration, ObjectId} = require('../../models/event_registration');
const {sendCustomError,sendSuccess}= require('../../helper/response');



const create = async (req, res) => {
    
let {title,event,student,course,followDate,nextDate,reason,status} = req.body;
  
  let requestData={event,title,student,course,followDate,nextDate,reason,status};
  let newEventRegistration = new EventRegistration(requestData);

   newEventRegistration.save(async (err, data) => {
    if(err){
         
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'EventRegistration already exists.');
        }else{
            console.log(err)
             return sendCustomError({}, res, 500, 'Error in adding eventRegistration.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "EventRegistration created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
    let {event_registration_id}=     req.params;
     const eventRegistrationDetails = await EventRegistration.findOne({ _id: event_registration_id}).populate('event',{title: 1,_id:1}).populate('student',{name: 1,_id:1}).populate('course',{title: 1,_id:1});

     if(eventRegistrationDetails)
          return sendSuccess(eventRegistrationDetails, res, 200, "EventRegistration details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching eventRegistration details.")
}

const update =async(req, res) =>{
let {title,event,student,course,followDate,nextDate,reason,status}= req.body;
   let {event_registration_id}=req.params;
   try{
    const eventRegistrationDetails = await EventRegistration.findOne({ _id: event_registration_id});
    if(eventRegistrationDetails){
           
            let eventRegistration = await EventRegistration.findOneAndUpdate({ _id: ObjectId(eventRegistrationDetails.id) },
                { $set: {title,event,student,course,followDate,nextDate,reason,status } },
                { new: true });
           
            return sendSuccess(eventRegistration, res, 200, "EventRegistration updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating eventRegistration.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating eventRegistration.")
   }
}

const destroy = async(req, res) =>{
 let {event_registration_id}=     req.params;
     const eventRegistrationDetails = await EventRegistration.findOne({ _id: event_registration_id});

     if(eventRegistrationDetails){
        await EventRegistration.remove({ _id: event_registration_id});

        return sendSuccess(eventRegistrationDetails, res, 200, "EventRegistration deleted successfully.");

     }   
     else{
        
         return sendCustomError({}, res, 500, "Error in deleting eventRegistration.")
     }
      
}

const listAll =async(req, res) =>{

    let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
    
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

    if(search_text.length>0){

        conditions={ title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await EventRegistration.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    EventRegistration.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "EventRegistrations list.");
       
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

    EventRegistration.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
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