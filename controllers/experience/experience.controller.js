const {Experience, ObjectId} = require('../../models/experience');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {teacherId, course,organisation,startYear,startMonth,  endYear,  endMonth,  location,created_at,updated_at

} = req.body;
//let slug=slugify(name.toLowerCase().trim());
  let requestData={teacherId, course,organisation,startYear,startMonth,  endYear,  endMonth,  location,created_at,updated_at
};
  let newExperience = new Experience(requestData);

   newExperience.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'experience already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding Experience.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "experience created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {experience_id}=     req.params;
     const experienceDetails = await Experience.findOne({ _id: experience_id});

     if(experienceDetails)
          return sendSuccess(experienceDetails, res, 200, "experience details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching experience details.")
}

const update =async(req, res) =>{
let {teacherId, course,organisation,startYear,startMonth,  endYear,  endMonth,  location,created_at,updated_at
}= req.body;

   let {experience_id}=req.params;
   try{
    const experienceDetails = await Experience.findOne({ _id: experience_id});
    if(experienceDetails){
           
            let experience = await Experience.findOneAndUpdate({ _id: ObjectId(experienceDetails.id) },
                { $set: {teacherId, course,organisation,startYear,startMonth,  endYear,  endMonth,  location,created_at,updated_at
                } },
                { new: true });
           
            return sendSuccess(experience, res, 200, "experience updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating Experience.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Experience.")
   }
}

const destroy = async(req, res) =>{
let {experience_id} = req.params;

const experienceDetails = await Experience.findOne({_id:experience_id});
   if(experienceDetails){
    await Experience.remove({_id:experience_id});
   return sendSuccess(experienceDetails, res, 200, "experience deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting experience")
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

        conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Experience.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Experience.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "experience list.");
       
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
    let conditions={};

    if(search_text.length>0){

        conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Experience.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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