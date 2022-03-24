const {Schedule, ObjectId} = require('../../models/schedule');
const {sendCustomError,sendSuccess}= require('../../helper/response');



const create = async (req, res) => {
    
let {title,mode,location,duration,batchStart,course } = req.body;
  
  let requestData={title,mode,location,duration,batchStart,course };
  let newSchedule = new Schedule(requestData);

   newSchedule.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Schedule already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding schedule.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Schedule created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {schedule_id}=     req.params;
     const scheduleDetails = await Schedule.findOne({ _id: schedule_id}).populate('course',{title:1,_id:1});

     if(scheduleDetails)
          return sendSuccess(scheduleDetails, res, 200, "Schedule details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching schedule details.")
}

const update =async(req, res) =>{
let {title,mode,location,duration,batchStart,course }= req.body;
   let {schedule_id}=req.params;
   try{
    const scheduleDetails = await Schedule.findOne({ _id: schedule_id});
    if(scheduleDetails){
           
            let schedule = await Schedule.findOneAndUpdate({ _id: ObjectId(scheduleDetails.id) },
                { $set: {title,mode,location,duration,batchStart,course } },
                { new: true });
           
            return sendSuccess(schedule, res, 200, "Schedule updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating schedule.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating schedule.")
   }
}

const destroy = async(req, res) =>{
let {schedule_id} = req.params;

const instructorDetails = await Schedule.findOne({_id:schedule_id});
   if(instructorDetails){
    await Schedule.remove({_id:schedule_id});
   return sendSuccess(instructorDetails, res, 200, "Schedule deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting schedule")
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

        conditions={ title: { $regex: '.*' + search_text + '.*'  ,'$options' : 'i'}};

    }


    let total_records= await Schedule.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Schedule.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Schedules list.");
       
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

    Schedule.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
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