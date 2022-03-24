const {Curriculum, ObjectId} = require('../../models/curriculum');
const {sendCustomError,sendSuccess}= require('../../helper/response');



const create = async (req, res) => {
    
let {title,course,status} = req.body;
  
  let requestData={title,course,status};
  let newCurriculum = new Curriculum(requestData);

   newCurriculum.save(async (err, data) => {
    if(err){
         
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Curriculum already exists.');
        }else{
            console.log(err)
             return sendCustomError({}, res, 500, 'Error in adding curriculum.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Curriculum created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
    let {curriculum_id}=     req.params;
     const curriculumDetails = await Curriculum.findOne({ _id: curriculum_id}).populate('sections',{title:1,_id:1}).populate('course',{title: 1,_id:1});

     if(curriculumDetails)
          return sendSuccess(curriculumDetails, res, 200, "Curriculum details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching curriculum details.")
}

const update =async(req, res) =>{
let {title,course,status}= req.body;
   let {curriculum_id}=req.params;
   try{
    const curriculumDetails = await Curriculum.findOne({ _id: curriculum_id});
    if(curriculumDetails){
           
            let curriculum = await Curriculum.findOneAndUpdate({ _id: ObjectId(curriculumDetails.id) },
                { $set: {title,course,status } },
                { new: true });
           
            return sendSuccess(curriculum, res, 200, "Curriculum updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating curriculum.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating curriculum.")
   }
}

const destroy = async(req, res) =>{
let {curriculum_id} = req.params;

const curriculumDetails = await Curriculum.findOne({_id:curriculum_id});
   if(curriculumDetails){
    await Curriculum.remove({_id:curriculum_id});
   return sendSuccess(curriculumDetails, res, 200, "Curriculum deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error in deleting curriculum")
}
}

const listAll =async(req, res) =>{

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

        conditions={ status:status, title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
     if(search_text.length==0 && status.length>0){

        conditions={ status:status };

    }
    if(search_text.length>0 && status.length==0){

        conditions={ title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' } };

    }


    let total_records= await Curriculum.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Curriculum.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Instructors list.");
       
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

    Curriculum.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
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