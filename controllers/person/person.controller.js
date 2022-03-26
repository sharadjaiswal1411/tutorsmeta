const { Person, ObjectId } = require('../../models/person');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');

const create = async (req, res) => {
let {firstName,designation,location,previousCompany,educationalPast,professionalPast,profileImage,source} =  req.body;
  let slug=slugify((firstName+ new Date().getTime()).toLowerCase().trim()); 
  let requestData={firstName,designation,location,previousCompany,educationalPast,professionalPast,profileImage,source};
  let conditions={};
  if(requestData.firstName){
            conditions={firstName: { $regex: '.*' + requestData.firstName + '.*' }};
        }
        let countData= await  Person.count(conditions);

        if(countData==0){
            if (requestData.profileImage) {
                try{
                    requestData['profileImage']=  await uploadFile(requestData.profileImage, slug);
                } 
            catch(e){
                requestData['profileImage']=null;
            }
            }
        }
  let newPerson = new Person(requestData);

   newPerson.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Person already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding person.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Person created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {person_id}=     req.params;
     const personDetails = await Person.findOne({ _id: person_id});

     if(personDetails)
          return sendSuccess(personDetails, res, 200, "Persons details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching person details.")

}

const update = async (req, res) => {
 let {firstName,designation,location,previousCompany,educationalPast,professionalPast,profileImage,source}= req.body;
   let {person_id}=req.params;
    let slug=slugify((firstName+ new Date().getTime()).toLowerCase().trim()); 
   try{
    const personDetails = await Person.findOne({ _id: person_id});
    if(personDetails){
        if(personDetails.profileImage!==profileImage){
            try{
                profileImage = await uploadFile(profileImage, slug);
                if(personDetails.profileImage && personDetails.profileImage!="" && personDetails.profileImage!==profileImage){
                    unlink(personDetails.profileImage, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            profileImage=profileImage;
          }
        }
           
            let person = await Person.findOneAndUpdate({ _id: ObjectId(personDetails.id) },
                { $set: {firstName,designation,location,previousCompany,educationalPast,professionalPast,profileImage,source } },
                { new: true });
           
            return sendSuccess(person, res, 200, "Person updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating Person.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating person.")
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

        conditions={ firstName: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Person.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Person.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Persons list.");
       
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
            order_by['firstName']=1;
    }
    let conditions={};

    if(search_text.length>0){

        conditions={ firstName: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Person.find(conditions,{_id:1,firstName:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
       return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {person_id}=     req.params;
     const personDetails = await Person.findOne({ _id: person_id});

     if(personDetails){
        await Person.remove({ _id: person_id});

        return sendSuccess(personDetails, res, 200, "Person deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting person.")
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