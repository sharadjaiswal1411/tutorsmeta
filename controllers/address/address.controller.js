const { Address, ObjectId } = require('../../models/address');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {
let {officeName,officeAddress,pincode,gpsLat,gpsLng,city} =  req.body;
  
  let requestData={officeName,officeAddress,pincode,gpsLat,gpsLng,city};
  let newAddress = new Address(requestData);

   newAddress.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Address already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding address.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Address created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {address_id}=     req.params;
     const addressDetails = await Address.findOne({ _id: address_id});

     if(addressDetails)
          return sendSuccess(addressDetails, res, 200, "Address details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching address details.")

}

const update = async (req, res) => {
 let {officeName,officeAddress,pincode,gpsLat,gpsLng,city}= req.body;
   let {address_id}=req.params;
   try{
    const addressDetails = await Address.findOne({ _id: address_id});
    if(addressDetails){
           
            let address = await Address.findOneAndUpdate({ _id: ObjectId(addressDetails.id) },
                { $set: {officeName,officeAddress,pincode,gpsLat,gpsLng,city } },
                { new: true });
           
            return sendSuccess(address, res, 200, "Address updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating address.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating address.")
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

        conditions={ officeName: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Address.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Address.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Address list.");
       
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
            order_by['officeAddress']=1;
    }
    let conditions={};

    if(search_text.length>0){

        conditions={ officeAddress: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }

    Address.find(conditions,{_id:1,officeAddress:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
         return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {address_id}=     req.params;
     const addressDetails = await Address.findOne({ _id: address_id});

     if(addressDetails){
        await Address.remove({ _id: address_id});

        return sendSuccess(addressDetails, res, 200, "Address deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting address.")
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