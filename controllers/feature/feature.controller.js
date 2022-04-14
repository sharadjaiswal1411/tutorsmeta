const {Feature, ObjectId} = require('../../models/feature');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {teacherId,course,classs,avaliablility,teachingMode,readyToTravel,teachingMedium,travelDistance
    ,created_at,updated_at

} = req.body;
//let slug=slugify(name.toLowerCase().trim());
  let requestData={teacherId,course,classs,avaliablility,teachingMode,readyToTravel,teachingMedium,travelDistance,created_at,updated_at
};
  let newFeature = new Feature(requestData);

   newFeature.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'feature already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding Feature.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "feature created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {feature_id}=     req.params;
     const featureDetails = await Feature.findOne({ _id: feature_id});

     if(featureDetails)
          return sendSuccess(featureDetails, res, 200, "feature details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching feature details.")
}

const update =async(req, res) =>{
let {teacherId,course,classs,avaliablility,teachingMode,readyToTravel,teachingMedium,travelDistance,created_at,updated_at
}= req.body;

   let {feature_id}=req.params;
   try{
    const featureDetails = await Feature.findOne({ _id: feature_id});
    if(featureDetails){
           
            let feature = await Feature.findOneAndUpdate({ _id: ObjectId(featureDetails.id) },
                { $set: {teacherId,course,classs,avaliablility,teachingMode,readyToTravel,teachingMedium,travelDistance,created_at,updated_at
                } },
                { new: true });
           
            return sendSuccess(feature, res, 200, "feature updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating Feature.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Feature.")
   }
}

const destroy = async(req, res) =>{
let {feature_id} = req.params;

const featureDetails = await Feature.findOne({_id:feature_id});
   if(featureDetails){
    await Feature.remove({_id:feature_id});
   return sendSuccess(featureDetails, res, 200, "feature deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting feature")
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


    let total_records= await Feature.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Feature.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "feature list.");
       
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

    Feature.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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