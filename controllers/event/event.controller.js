const { Event, ObjectId } = require('../../models/event');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

const create = async (req, res) => {
  let {title,branch,college,instructor,banner,image,description,regType,regFees,
        startDate,endDate,type,metaTitle,metaDescription,status}= req.body;
        let slug=slugify(title.toLowerCase().trim());
  
  let requestData={title,branch,college,instructor,slug,banner,image,description,regType,regFees,
        startDate,endDate,type,metaTitle,metaDescription,status};
        let conditions={};

        if(requestData.title){
      
          conditions={title: { $regex: '.*' + requestData.title + '.*' }};
      
      }
      let countData= await  Event.count(conditions);
      
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
  let newEvent = new Event(requestData);

  newEvent.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Event already exists.')
        }else{
             return sendCustomError({}, res, err.code, 'Error in adding event.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Event created successfully.");
    }

   })

}



const view = async (req, res) => {
 let {event_id}=     req.params;
     const eventDetails = await Event.findOne({ _id: event_id}).populate('branch',{ title: 1,_id:1 }).populate('college',{ name: 1,_id:1 }).populate('instructor',{ name: 1,_id:1 });

     if(eventDetails)
          return sendSuccess(eventDetails, res, 200, "Event details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching event details.")

}

const update = async (req, res) => {
   let {title,branch,college,instructor,banner,image,description,regType,regFees,
        startDate,endDate,type,metaTitle,metaDescription,status}= req.body;
   let {event_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    
    const eventDetails = await Event.findOne({ _id: event_id});
    if(eventDetails){
        if(eventDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(eventDetails.image && eventDetails.image!="" && eventDetails.image!==image){
                    unlink(eventDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(eventDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(eventDetails.banner && eventDetails.banner!="" && eventDetails.banner!==banner){
                    unlink(eventDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }
            let event = await Event.findOneAndUpdate({ _id: ObjectId(eventDetails.id) },
                { $set: { title,branch,college,instructor,banner,image,description,regType,regFees,
        startDate,endDate,type,metaTitle,metaDescription,status } },
                { new: true });
           
            return sendSuccess(event, res, 200, "Event updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, e.code, "Error in updating event.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating event.")
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

    if(status.length>0 && search_text.length>0 ){
       
        conditions={status:status , title: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }

    if(status.length>0 && search_text.length==0){
       conditions={status:status}

    }

    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }


    let total_records= await Event.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Event.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Events list.");
       
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

       conditions={ title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

   }


   

   Event.find(conditions,{_id:1,title:1,sort:order_by},  function(err, results) {
       // let data={
       //     'results':results,
           
       // }
       return res.status(200).json(results);
      
   });

   
}


const destroy = async (req, res) => {
 let {event_id}=     req.params;
     const eventDetails = await Event.findOne({ _id: event_id});

     if(eventDetails){
        await Event.remove({ _id: event_id});

        return sendSuccess(eventDetails, res, 200, "Event deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting event.")
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