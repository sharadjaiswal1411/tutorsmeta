const {Benefit, ObjectId} = require('../../models/benefit');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async (req, res) => {
     
let {name,image} = req.body;
  let slug=slugify(name.toLowerCase().trim());
  let requestData={name,slug,image};
  let conditions={};

  if(requestData.name){

    conditions={name: { $regex: '.*' + requestData.name + '.*' }};

}
 let countData= await  Benefit.count(conditions);
     if(countData==0){
        if (requestData.image) {
            try{
                requestData['image']=  await uploadFile(requestData.image, slug);
                // console.log("ifimage",requestData);
            } 
          catch(e){
            requestData['image']=null;
            // console.log("elseimage",requestData);
          }
        }
    }
  let newBenefit = new Benefit(requestData);
   newBenefit.save(async (err, data) => {
    if(err){
      
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Benefit already exists.')
        }else{
            console.log(err)
             return sendCustomError({}, res, 500, 'Error in adding benefit.')
        }
       
    }else{

          return sendSuccess(data, res, 200, "Benefit created successfully.");
    
    }

   })



}


const view = async(req,res) =>{
    let{benefit_id} = req.params;

    let benefitDetails = await Benefit.findOne({_id:benefit_id});
    if(benefitDetails)
        return sendSuccess({benefitDetails}, res, 200, "Benefit Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching benefit")
}

const update =async(req, res) =>{
let {name,image}= req.body;
let slug=slugify(name.toLowerCase().trim());
   let {benefit_id}=req.params;
   try{
    const benefitDetails = await Benefit.findOne({ _id: benefit_id});
    if(benefitDetails){
           if(benefitDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(benefitDetails.image && benefitDetails.image!="" && benefitDetails.image!==image){
                    unlink(benefitDetails.image, (err) => {
                        if (err) 
                        //throw err;
                         console.log(err);
                    });
                }

                // console.log("ifimage",benefitDetails);
            } 
          catch(e){
            image=image;
            // console.log("elseimage",benefitDetails);
          }
        }
            let city = await Benefit.findOneAndUpdate({ _id: ObjectId(benefitDetails.id) },
                { $set: {name,image } },
                { new: true });
           
            return sendSuccess(city, res, 200, "Benefit updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating benefit.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating benefit.")
   }
}

const destroy = async(req, res) =>{
let {benefit_id} = req.params;

const benefitDetails = await Benefit.findOne({_id:benefit_id});
   if(benefitDetails){
   	await Benefit.remove({_id:benefit_id});
   return sendSuccess(benefitDetails, res, 200, "Benefit deleted successfully")

   }else{
   	return sendCustomError({}, res, 500, "Error i deleting benefit")
}
}

const listAll =async( req,res) =>{
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


    let total_records= await Benefit.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Benefit.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Benefits list.");
       
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
    let conditions={status:'ACTIVE'};

    if(search_text.length>0){

        conditions={status:'ACTIVE', name: { $regex: '.*' + search_text + '.*','$options' : 'i' }};

    }

    Benefit.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
       
        //  console.log("results",results)
       // return sendSuccess(data, res, 200, "Benefit list.");

       return res.status(200).json(results);
       
    }).limit(7);
  
}



module.exports = {

	create,
	update,
	view,
	listAll,
	destroy,
    search
}