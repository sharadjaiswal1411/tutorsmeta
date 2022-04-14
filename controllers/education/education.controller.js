const {Education, ObjectId} = require('../../models/education');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {teacherId, degreeType,college,startYear,  endYear, created_at,updated_at

} = req.body;
//let slug=slugify(name.toLowerCase().trim());
  let requestData={teacherId, degreeType,college,startYear,  endYear, created_at,updated_at
};
  let newEducation = new Education(requestData);

   newEducation.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'education already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding Education.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "education created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {education_id}=     req.params;
     const educationDetails = await Education.findOne({ _id: education_id});

     if(educationDetails)
          return sendSuccess(educationDetails, res, 200, "education details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching education details.")
}

const update =async(req, res) =>{
let {teacherId, degreeType,college,startYear,  endYear, created_at,updated_at
}= req.body;

   let {education_id}=req.params;
   try{
    const educationDetails = await Education.findOne({ _id: education_id});
    if(educationDetails){
           
            let education = await Education.findOneAndUpdate({ _id: ObjectId(educationDetails.id) },
                { $set: {teacherId, degreeType,college,startYear,  endYear, created_at,updated_at
                } },
                { new: true });
           
            return sendSuccess(education, res, 200, "education updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating Education.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Education.")
   }
}

const destroy = async(req, res) =>{
let {education_id} = req.params;

const educationDetails = await Education.findOne({_id:education_id});
   if(educationDetails){
    await Education.remove({_id:education_id});
   return sendSuccess(educationDetails, res, 200, "education deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting education")
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


    let total_records= await Education.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Education.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "education list.");
       
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

    Education.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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