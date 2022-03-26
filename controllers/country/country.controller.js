const {Country, ObjectId} = require('../../models/country');
const {sendCustomError,sendSuccess}= require('../../helper/response');
const  slugify = require('slugify');


const create = async (req, res) => {
    
let {name} = req.body;
let slug=slugify(name.toLowerCase().trim());
  let requestData={name,slug};
  let newCountry = new Country(requestData);

   newCountry.save(async (err, data) => {
    if(err){
        
        if(err.code==11000){
            return sendCustomError({}, res, 500, 'Country already exists.');
        }else{
             return sendCustomError({}, res, 500, 'Error in adding country.');
        }
       
    }else{

          return sendSuccess(data, res, 200, "Country created successfully.");
    
    }

   })


}


const view = async(req,res) =>{
   let {country_id}=     req.params;
     const countryDetails = await Country.findOne({ _id: country_id});

     if(countryDetails)
          return sendSuccess(countryDetails, res, 200, "Country details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching country details.")
}

const update =async(req, res) =>{
let {name}= req.body;

   let {country_id}=req.params;
   try{
    const countryDetails = await Country.findOne({ _id: country_id});
    if(countryDetails){
           
            let country = await Country.findOneAndUpdate({ _id: ObjectId(countryDetails.id) },
                { $set: {name} },
                { new: true });
           
            return sendSuccess(country, res, 200, "Country updated successfully.");
       
    }else{
          
            return sendCustomError({}, res, 500, "Error in updating country.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating country.")
   }
}

const destroy = async(req, res) =>{
let {country_id} = req.params;

const countryDetails = await Country.findOne({_id:country_id});
   if(countryDetails){
    await Country.remove({_id:country_id});
   return sendSuccess(countryDetails, res, 200, "Country deleted successfully")

   }else{
    return sendCustomError({}, res, 500, "Error i deleting country")
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


    let total_records= await Country.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Country.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Countries list.");
       
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

    Country.find(conditions,{_id:1,name:1,sort:order_by}, function(err, results) {
     
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