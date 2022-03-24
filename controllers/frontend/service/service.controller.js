const {Service, ObjectId} = require('../../../models/service');
const {sendCustomError,sendSuccess}= require('../../../helper/response');
const { env } = process;
const CryptoJS = require("crypto-js");




const view = async(req,res) =>{
   let {slug}=     req.params;
     let serviceDetails = await Service.findOne({ slug: slug});

     if(serviceDetails){
        let original=JSON.stringify(serviceDetails)
        let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();
        return sendSuccess(ciphertext, res, 200, "Service details.");
     }
          
     else
       return sendCustomError({}, res, 500, "Error in fetching service details.")
}

const index =async(req, res) =>{
	let order_by={name:1};
    Service.find({'status':'ACTIVE'},{_id:1,title:1,slug:1,sort:order_by}, function(err, results) {
    let original=JSON.stringify(results)
    let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();
   
    return sendSuccess(ciphertext, res, 200, "Service list.");
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

        conditions={status:true, name: { $regex: '.*' + search_text + '.*' }};

    }

    Service.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        let data={
            'results':results
        
        }
        
        return sendSuccess(data, res, 200, "Service list.");
       
    });
  
}




module.exports = {
    view,
    index,
    search
}