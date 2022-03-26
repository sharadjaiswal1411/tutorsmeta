const {Section, ObjectId} = require('../../models/section');
const {sendCustomError,sendSuccess}= require('../../helper/response');



const create = async (req, res) => {
    
let {title,description,status} = req.body;
  
  let requestData={title,description,status};
  let newSection = new Section(requestData);

   newSection.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Section already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding section.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Section created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {section_id}=     req.params;
     const sectionDetails = await Section.findOne({ _id: section_id});

     if(sectionDetails)
          return sendSuccess(sectionDetails, res, 200, "Section details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching section details.")
}

const update =async(req, res) =>{
let {title,description,status}= req.body;

   let {section_id}=req.params;
   try{
    const sectionDetails = await Section.findOne({ _id: section_id});
    if(sectionDetails){
           
            let section = await Section.findOneAndUpdate({ _id: ObjectId(sectionDetails.id) },
                { $set: {title,description,status} },
                { new: true });
           
            return sendSuccess(section, res, 200, "Section updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating section.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating section.")
   }
}

const destroy = async(req, res) =>{
let {section_id} = req.params;

const sectionDetails = await Section.findOne({_id:section_id});
   if(sectionDetails){
    await Section.remove({_id:section_id});
   return sendSuccess(sectionDetails, res, 200, "Section deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting section")
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

    if(status.length>0 && search_text.length>0 ){
       
        conditions={status:status , title: { $regex: '.*' + search_text + '.*','$options' : 'i' }}
     }

    if(status.length>0 && search_text.length==0){
       conditions={status:status}

    }

    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }

    let total_records= await Section.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Section.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Sections list.");
       
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

    }

    Section.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
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