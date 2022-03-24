const { City, ObjectId } = require('../../models/city');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');


const create = async (req, res) => {
let {title,description,status,image} =  req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={title,slug,description,status,image};
  let conditions={};
  if(requestData.title){
    conditions={title: { $regex: '.*' + requestData.title + '.*' }};
}
let countData= await  City.count(conditions);

if(countData==0){
    if (requestData.image) {
        try{
            requestData['image']=  await uploadFile(requestData.image, slug);
        } 
      catch(e){
        requestData['image']=null;
      }
    }
 }
  let newCity = new City(requestData);

   newCity.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'City already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding city.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "City created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {city_id}=     req.params;
     const cityDetails = await City.findOne({ _id: city_id});

     if(cityDetails)
          return sendSuccess(cityDetails, res, 200, "Cities details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching city details.")

}

const update = async (req, res) => {
 let {title,description,status,image}= req.body;
   let {city_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const cityDetails = await City.findOne({ _id: city_id});
    if(cityDetails){
        if(cityDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(cityDetails.image && cityDetails.image!="" && cityDetails.image!==image){
                    unlink(cityDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }
            let city = await City.findOneAndUpdate({ _id: ObjectId(cityDetails.id) },
                { $set: { title,description,status,image} },
                { new: true });
           
            return sendSuccess(city, res, 200, "City updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating city.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating City.")
   }

}

const listAll = async (req, res) => {
  
    let current_page= parseInt((req.query.current_page)?req.query.current_page:1);
    let search_text= (req.query.search_text)?req.query.search_text:"";
      let status= (req.query.status)?req.query.status:"";
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

    if(status.length>0 && search_text.length>0){

        conditions={ status:status,title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(status.length>0 && search_text.length==0){

        conditions={ status:status};

    }
    if(status.length==0 && search_text.length>0){

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    
    let total_records= await City.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    City.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Cities list.");
       
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
            order_by['title']=1;
    }
    let conditions={status:'ACTIVE'};

    if(search_text.length>0){

        conditions={ status:'ACTIVE',title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};
    }
    City.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
        // let data={
        //     'results':results
        // }
         return res.status(200).json(results);
    });
}





const destroy = async (req, res) => {
 let {city_id}=     req.params;
     const cityDetails = await City.findOne({ _id: city_id});

     if(cityDetails){
        await City.remove({ _id: city_id});

        return sendSuccess(cityDetails, res, 200, "Cities deleted successfully.");
     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting city.")
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