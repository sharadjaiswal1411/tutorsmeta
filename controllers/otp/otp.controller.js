const { Otp, ObjectId } = require('../../models/otp');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {
let {phoneCode,mobileNumber} =  req.body;
  
  let requestData={phoneCode,mobileNumber};
  let newOtp = new Otp(requestData);

   newOtp.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Otp already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding otp.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Otp created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {otp_id}=     req.params;
     const otpDetails = await Otp.findOne({ _id: otp_id});

     if(otpDetails)
          return sendSuccess(otpDetails, res, 200, "Otps details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching otp details.")

}

const update = async (req, res) => {
 let {phoneCode,mobileNumber}= req.body;
   let {otp_id}=req.params;
   try{
    const otpDetails = await Otp.findOne({ _id: otp_id});
    if(otpDetails){
           
            let otp = await Otp.findOneAndUpdate({ _id: ObjectId(otpDetails.id) },
                { $set: {phoneCode,mobileNumber } },
                { new: true });
           
            return sendSuccess(otp, res, 200, "Otp updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating otp.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating otp.")
   }

}

const listAll = async (req, res) => {
  
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


    let total_records= await Otp.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Otp.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Otps list.");
       
    });


}
const search = async (req, res) => {
   
    let search_text= (req.query.search_text)?req.query.search_text:"";
    let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['name']=1;
    }
    let conditions={status:true};

    if(search_text.length>0){

        conditions={status:true, name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Otp.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        let data={
            'results':results
        
        }
        
        return sendSuccess(data, res, 200, "Otp list.");
       
    });
  
}


const destroy = async (req, res) => {
 let {otp_id}=     req.params;
     const otpDetails = await Otp.findOne({ _id: otp_id});

     if(otpDetails){
        await Otp.remove({ _id: otp_id});

        return sendSuccess(otpDetails, res, 200, "Otps deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting otp.")
     }
      
     

}


module.exports = {
    create,
    view,
    update,
    listAll,
    destroy,
    search

};