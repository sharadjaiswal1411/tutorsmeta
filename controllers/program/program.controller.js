const { Program, ObjectId } = require('../../models/program');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');

const create = async (req, res) => {
let {courses,city,title,image,banner,description,duration,status} =  req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={courses,city,title,slug,image,banner,description,duration,status};
   let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
 let countData= await  Program.count(conditions);
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
        if (requestData.banner) {
            try{
                requestData['banner']=  await uploadFile(requestData.banner, slug+'-banner');
                // console.log("ifimage",requestData);
            } 
          catch(e){
            requestData['banner']=null;
            // console.log("elseimage",requestData);
          }
        }
    }
  let newProgram = new Program(requestData);

   newProgram.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Program already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding program.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Program created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {program_id}=     req.params;
     const programDetails = await Program.findOne({ _id: program_id}).populate('courses',{title:1,_id:1}).populate('city',{title:1,_id:1});

     if(programDetails)
          return sendSuccess(programDetails, res, 200, "Program details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching program details.")

}

const update = async (req, res) => {
 let {courses,city,title,image,banner,description,duration,status}= req.body;
   let {program_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const programDetails = await Program.findOne({ _id: program_id});
    if(programDetails){
           
           if(programDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(programDetails.image && programDetails.image!="" && programDetails.image!==image){
                    unlink(programDetails.image, (err) => {
                        if (err) 
                        //throw err;
                         console.log(err);
                    });
                }

                // console.log("ifimage",programDetails);
            } 
          catch(e){
            image=image;
            // console.log("elseimage",programDetails);
          }
        }

        if(programDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(programDetails.banner && programDetails.banner!="" && programDetails.banner!==banner){
                    unlink(programDetails.banner, (err) => {
                        if (err) 
                        //throw err;
                        console.log('err',err);
                    });
                }
                // console.log("ifimage",programDetails);
            } 
          catch(e){
          banner=banner;
            // console.log("elseimage",programDetails);
          }
        }
            let program = await Program.findOneAndUpdate({ _id: ObjectId(programDetails.id) },
                { $set: {courses,city,title,image,banner,description,duration,status } },
                { new: true });
           
            return sendSuccess(program, res, 200, "Program updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating program.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating program.")
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

    if(search_text.length>0 && status.length>0){

        conditions={status:status, title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }
    if(search_text.length==0 && status.length>0){

        conditions={status:status};

    }
    if(search_text.length>0 && status.length==0){

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }


    let total_records= await Program.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Program.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Programs list.");
       
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

    }

    Program.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {program_id}=     req.params;
     const programDetails = await Program.findOne({ _id: program_id});

     if(programDetails){
        await Program.remove({ _id: program_id});

        return sendSuccess(programDetails, res, 200, "Program deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting Program.")
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