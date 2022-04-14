const {TeacherAddress, ObjectId} = require('../../models/teacherAddress');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at

} = req.body;
//let slug=slugify(name.toLowerCase().trim());
  let requestData={studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
};
  let newTeacherAddress = new TeacherAddress(requestData);

   newTeacherAddress.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'TeacherAddress already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding TeacherAddress.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "TeacherAddress created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {teacherAddress_id}=     req.params;
     const teacherAddressDetails = await TeacherAddress.findOne({ _id: teacherAddress_id});

     if(teacherAddressDetails)
          return sendSuccess(teacherAddressDetails, res, 200, "teacherAddress details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching teacherAddress details.")
}

const update =async(req, res) =>{
let {studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
}= req.body;

   let {teacherAddress_id}=req.params;
   try{
    const teacherAddressDetails = await TeacherAddress.findOne({ _id: teacherAddress_id});
    if(teacherAddressDetails){
           
            let teacherAddress = await TeacherAddress.findOneAndUpdate({ _id: ObjectId(teacherAddressDetails.id) },
                { $set: {studentId,address,pincode,gpsLat,gpsLng,cityId,state,country,landmark,created_at,updated_at
                } },
                { new: true });
           
            return sendSuccess(teacherAddress, res, 200, "teacherAddress updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating teacherAddress.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating teacherAddress.")
   }
}

const destroy = async(req, res) =>{
let {teacherAddress_id} = req.params;

const teacherAddressDetails = await TeacherAddress.findOne({_id:teacherAddress_id});
   if(teacherAddressDetails){
    await TeacherAddress.remove({_id:teacherAddress_id});
   return sendSuccess(teacherAddressDetails, res, 200, "teacherAddress deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting teacherAddress")
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


    let total_records= await TeacherAddress.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    TeacherAddress.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "TeacherAddress list.");
       
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

    TeacherAddress.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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