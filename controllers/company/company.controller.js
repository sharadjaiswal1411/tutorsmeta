const { Company, ObjectId } = require('../../models/company');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const { genrateCompanyToken } = require('../../middlewares/auth-company');
const bcrypt = require('bcryptjs');
const { PASSWORD } = require('../../constant/common');
const  slugify = require('slugify');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');


const create = async (req, res) => {
let {name,email,phone,logo,shortName,registeredName,website,featured,facebook,twitter,
      linkedIn,totalEmployees,startDate,followersCount,about,headquatered,employeesIndia,headquaters} =  req.body;
      let slug=slugify(name.toLowerCase().trim());
 
  let requestData={name,email,slug,phone,logo,shortName,registeredName,featured,website,facebook,twitter,
      linkedIn,totalEmployees,startDate,followersCount,about,headquatered,employeesIndia,headquaters};
      let conditions={};
      if(requestData.name){
        conditions={name: { $regex: '.*' + requestData.name + '.*' }};
    }
    let countData= await  Company.count(conditions);
    
    if(countData==0){
        if (requestData.logo) {
            try{
                requestData['logo']=  await uploadFile(requestData.logo, slug);
            } 
          catch(e){
            requestData['logo']=null;
          }
        }
     }
  let newCompany = new Company(requestData);

   newCompany.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            console.log(err)
            return sendCustomError({}, res, err.code, 'Company already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding company.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Company created successfully.");
    }

   })


}



const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        const companyDetails = await Company.findOne({ email })
        if (!companyDetails) {
            return sendCustomError({}, res, 401, 'Company not found!')
        }
        const isMatchPassword = await companyDetails.isValidPassword(res, password);
        if (!isMatchPassword) {

            return sendCustomError({}, res, 200, 'Email/Password not matched!');
        }
        if (companyDetails) {
            let token = await genrateCompanyToken({ email: companyDetails.email, companyId: companyDetails.id});
              
            let instructor = await Company.findOneAndUpdate({ _id: ObjectId(companyDetails.id) },
                { $set: { accessToken: token } },
                { new: true });
              
              let responseData=companyDetails.toJSON(); 
              responseData['accessToken']=token;
              delete responseData['password'];
            return sendSuccess(responseData, res, 200, "Logged in successfully.");
        } else {
            return sendCustomError({}, res, 400, "Something went wrong!");
        }
    } catch (error) {
        console.log(error);
        return sendCustomError({}, res, error.code || 401, error.message)
    }
};





const view = async (req, res) => {
 let {company_id}=     req.params;
     const companyDetails = await Company.findOne({ _id: company_id}).populate('headquaters',{officeAddress:1,_id:1});

     if(companyDetails)
          return sendSuccess(companyDetails, res, 200, "Company details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching company details.")

}

const update = async (req, res) => {
 let {name,email,phone,logo,shortName,registeredName,featured,website,facebook,twitter,
      linkedIn,totalEmployees,startDate,followersCount,about,headquatered,employeesIndia,headquaters}= req.body;
   let {company_id}=req.params;
   let slug=slugify(name.toLowerCase().trim());
   try{
    const companyDetails = await Company.findOne({ _id: company_id});
    if(companyDetails){
      
        if(companyDetails.logo!==logo){
            try{
                logo = await uploadFile(logo, slug);
                if(companyDetails.logo && companyDetails.logo!="" && companyDetails.logo!==logo){
                    unlink(companyDetails.logo, (err) => {
                        if (err) 
                         console.log("err",err);
                    });
                }
            } 
          catch(e){
            logo=logo;
          }
        }
            let Company = await Company.findOneAndUpdate({ _id: ObjectId(companyDetails.id) },
                { $set: {name,email,phone,logo,shortName,registeredName,featured,website,facebook,twitter,
                    linkedIn,totalEmployees,startDate,followersCount,about,headquatered,employeesIndia,headquaters } },
                { new: true });
          
            return sendSuccess(Company, res, 200, "Company updated successfully.");
       
    }else{
        console.log("err",err);
            return sendCustomError({}, res, 500, "Error n updating company.")

    }
     
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating company.")
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


    let total_records= await Company.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Company.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Companies list.");
       
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

    Company.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
         return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {company_id}=     req.params;
     const companyDetails = await Company.findOne({ _id: company_id});

     if(companyDetails){
        await Company.remove({ _id: company_id});

        return sendSuccess(companyDetails, res, 200, "Company deleted successfully.");

     }   
     else{
        
         return sendCustomError({}, res, 500, "Error in deleting company.")
     }
      
     

}


module.exports = {
    create,
    login,
    view,
    update,
    listAll,
    destroy,
    search

};