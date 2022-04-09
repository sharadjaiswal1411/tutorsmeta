const {State, ObjectId} = require('../../models/state');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {name,  country_id,country_code,fips_code,iso2,type,latitude,longitude,created_at,updated_at,flag,wikiDataId 
} = req.body;
let slug=slugify(name.toLowerCase().trim());
  let requestData={name,  country_id,country_code,fips_code,iso2,type,latitude,longitude,created_at,updated_at,flag,wikiDataId 
,slug};
  let newState = new State(requestData);

   newState.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'State already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding State.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "State created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {state_id}=     req.params;
     const stateDetails = await State.findOne({ _id: state_id});

     if(stateDetails)
          return sendSuccess(stateDetails, res, 200, "State details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching State details.")
}

const update =async(req, res) =>{
let {name,  country_id,country_code,fips_code,iso2,type,latitude,longitude,created_at,updated_at,flag,wikiDataId 
,slug}= req.body;

   let {state_id}=req.params;
   try{
    const stateDetails = await State.findOne({ _id: state_id});
    if(stateDetails){
           
            let state = await State.findOneAndUpdate({ _id: ObjectId(stateDetails.id) },
                { $set: {name} },
                { new: true });
           
            return sendSuccess(state, res, 200, "State updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating State.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating State.")
   }
}

const destroy = async(req, res) =>{
let {state_id} = req.params;

const stateDetails = await State.findOne({_id:state_id});
   if(stateDetails){
    await State.remove({_id:state_id});
   return sendSuccess(stateDetails, res, 200, "State deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting state")
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


    let total_records= await State.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    State.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Countries list.");
       
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

    State.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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