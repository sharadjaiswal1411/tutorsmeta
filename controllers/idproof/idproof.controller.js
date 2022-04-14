const {Idproof, ObjectId} = require('../../models/idproof');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {teacherId,idname,idnumber,idimage,created_at,updated_at

} = req.body;
//let slug=slugify(name.toLowerCase().trim());
  let requestData={teacherId,idname,idnumber,idimage,created_at,updated_at
};
  let newIdproof = new Idproof(requestData);

   newIdproof.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'idproof already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding Idproof.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "idproof created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {idproof_id}=     req.params;
     const idproofDetails = await Idproof.findOne({ _id: idproof_id});

     if(idproofDetails)
          return sendSuccess(idproofDetails, res, 200, "idproof details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching idproof details.")
}

const update =async(req, res) =>{
let {teacherId,idname,idnumber,idimage,created_at,updated_at
}= req.body;

   let {idproof_id}=req.params;
   try{
    const idproofDetails = await Idproof.findOne({ _id: idproof_id});
    if(idproofDetails){
           
            let idproof = await Idproof.findOneAndUpdate({ _id: ObjectId(idproofDetails.id) },
                { $set: {teacherId,idname,idnumber,idimage,created_at,updated_at
                } },
                { new: true });
           
            return sendSuccess(idproof, res, 200, "idproof updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating Idproof.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Idproof.")
   }
}

const destroy = async(req, res) =>{
let {idproof_id} = req.params;

const idproofDetails = await Idproof.findOne({_id:idproof_id});
   if(idproofDetails){
    await Idproof.remove({_id:idproof_id});
   return sendSuccess(idproofDetails, res, 200, "idproof deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting idproof")
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


    let total_records= await Idproof.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Idproof.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "idproof list.");
       
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

    Idproof.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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