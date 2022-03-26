const { CompanyType, ObjectId } = require('../../models/company_type');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const  slugify = require('slugify');

const create = async (req, res) => {
let {name} =  req.body;
let slug=slugify(name.toLowerCase().trim());
  let requestData={name,slug};
  let newCompanyType = new CompanyType(requestData);

   newCompanyType.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Company_type already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding company_type.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Company_type created successfully.");
    }

   })


}



const view = async(req,res) =>{
    let {company_type_id} = req.params;
   console.log("companyDetails",company_type_id)
    let companyDetails = await CompanyType.findOne({_id:company_type_id});
    //  console.log("companyDetails",companyDetails)
    if(companyDetails)

        return sendSuccess({companyDetails}, res, 200, "CompanyType Details");
    else
        return sendCustomError({}, res, 500, "Error in fetching companyType")
}
const update = async (req, res) => {
 let {name}= req.body;
   let {company_type_id}=req.params;
   try{
    const companyTypeDetails = await CompanyType.findOne({ _id: company_type_id});
    if(companyTypeDetails){
           
            let companyType = await CompanyType.findOneAndUpdate({ _id: ObjectId(companyTypeDetails.id) },
                { $set: {name} },
                { new: true });
           
            return sendSuccess(companyType, res, 200, "company_type updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating company_type.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating company_type.")
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


    let total_records= await CompanyType.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    CompanyType.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Company_types list.");
       
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

    CompanyType.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
         return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {company_type_id}=     req.params;
     const compantTypeDetails = await CompanyType.findOne({ _id: company_type_id});

     if(compantTypeDetails){
        await CompanyType.remove({ _id: company_type_id});

        return sendSuccess(compantTypeDetails, res, 200, "company_types deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting company_type.")
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