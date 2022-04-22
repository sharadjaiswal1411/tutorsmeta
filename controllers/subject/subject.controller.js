const { Subject, ObjectId } = require('../../models/subject');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const  slugify = require('slugify');
const { toUpper } = require('lodash');
const create = async (req, res) => {
  let {name,status}= req.body;
       

  name=name.toUpperCase();
  
  let slug=slugify(name.toLowerCase().trim());
  let requestData={name,status,slug};

  let newSubject = new Subject(requestData);
  console.log("hiiii")
  newSubject.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Subject already exists.')
        }else{
             return sendCustomError({}, res, err.code, 'Error in adding subject.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Subject created successfully.");
    }

   })

}



const view = async (req, res) => {
let {subject_id}=     req.params;
console.log(req.params)
     const subjectDetails = await Subject.findOne({ _id : subject_id});

     if(subjectDetails)
          return sendSuccess(subjectDetails, res, 200, "Subject details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching subject details.")

}


const getsubjectid = async (req, res) => {
    
let {name}=     req.params;


const subjectDetails = await Subject.findOne({ name : name});
console.log(  subjectDetails._id)
if(subjectDetails)
     {sendSuccess(subjectDetails._id , res, 200, "Subject details.");
     return subjectDetails._id;}
else
  return sendCustomError({}, res, 500, "Error in fetching subject details.")

}
// const vieww = async (req, res) => {
//     let {name}=     req.params;
//          const roleDetails = await Role.findOne({ name: name});
    
//          if(roleDetails)
//               return sendSuccess(roleDetails, res, 200, "Roles details.");
//          else
//            return sendCustomError({}, res, 500, "Error in fetching role details.")
    
//     }

const update = async (req, res) => {
   let {name,status}=     req.body;
   let {subject_id}=     req.params;
   try{
    name=name.toUpperCase();
    const subjectDetails = await Subject.findOne({ _id: subject_id});
    if(subjectDetails){
           
            let subject = await Subject.findOneAndUpdate({ _id: ObjectId(subjectDetails.id) },
                { $set: { name,status } },
                { new: true });
           
            return sendSuccess(subject, res, 200, "Subject updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, e.code, "Error in updating subject.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating subject.")
   }
   

 //  if(roleDetails)
  

}


const listAll = async (req, res) => {
     let query={};
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

   
    
    if(search_text.length){
     //   current_page=null;
        conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Subject.countDocuments(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Subject.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Subject list.");
       
    });
   // return sendSuccess("Subject list is empty", res, 200, "Subject list.");
    
}


const search = async (req, res) => {
    
    let status= (req.query.status)?req.query.status:"";

   let search_text= (req.query.q)?req.query.q:"";
   let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['name']=1;
    }
   let conditions={status:toUpper(status)}
   if(search_text.length>0){

       conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

   }
   Subject.find(conditions,{_id:1,name:1,sort:order_by},  function(err, results) {
    //    let data={
    //        'results':results,
           
    //    }
       return res.status(200).json(results);
      
   });

   
}


const destroy = async (req, res) => {
 let {subject_id}=     req.params;
     const subjectDetails = await Subject.findOne({ _id: subject_id});

     if(subjectDetails){
        await Subject.remove({ _id: subject_id});

        return sendSuccess(subjectDetails, res, 200, "Subject deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting subject.")
     }

}


module.exports = {
    create,
    view,
    getsubjectid,
    update,
    listAll,
    destroy,
    search
};