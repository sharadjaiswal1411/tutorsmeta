const { Role, ObjectId } = require('../../models/role');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {
  let {name,status}= req.body;
  
  name=name.toUpperCase();
  let requestData={name,status};

  let newRole = new Role(requestData);

  newRole.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Role already exists.')
        }else{
             return sendCustomError({}, res, err.code, 'Error in adding role.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Role created successfully.");
    }

   })

}



const view = async (req, res) => {
let {role_id}=     req.params;
     const roleDetails = await Role.findOne({ _id : role_id});

     if(roleDetails)
          return sendSuccess(roleDetails, res, 200, "Roles details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching role details.")

}


const getroleid = async (req, res) => {
    
let {name}=     req.params;


const roleDetails = await Role.findOne({ name : name});
console.log(  roleDetails._id)
if(roleDetails)
     {sendSuccess(roleDetails._id , res, 200, "Roles details.");
     return roleDetails._id;}
else
  return sendCustomError({}, res, 500, "Error in fetching role details.")

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
   let {role_id}=     req.params;
   try{
    name=name.toUpperCase();
    const roleDetails = await Role.findOne({ _id: role_id});
    if(roleDetails){
           
            let role = await Role.findOneAndUpdate({ _id: ObjectId(roleDetails.id) },
                { $set: { name,status } },
                { new: true });
           
            return sendSuccess(role, res, 200, "Role updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, e.code, "Error in updating role.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating role.")
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

    if(search_text.length>0){

        conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Role.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Role.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Roles list.");
       
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
   let conditions={status:true}
   if(search_text.length>0){

       conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

   }
   Role.find(conditions,{_id:1,name:1,sort:order_by},  function(err, results) {
    //    let data={
    //        'results':results,
           
    //    }
       return res.status(200).json(results);
      
   });

   
}


const destroy = async (req, res) => {
 let {role_id}=     req.params;
     const roleDetails = await Role.findOne({ _id: role_id});

     if(roleDetails){
        await Role.remove({ _id: role_id});

        return sendSuccess(roleDetails, res, 200, "Roles deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting role.")
     }

}


module.exports = {
    create,
    view,
    getroleid,
    update,
    listAll,
    destroy,
    search
};