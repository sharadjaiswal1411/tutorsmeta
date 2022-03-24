const { Quiz, ObjectId } = require('../../models/quiz');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');

const create = async (req, res) => {
let {course,category,instructor,title,banner,branch,image,description,duration,questions,metaTitle,metaDescription,status} =  req.body;
let slug=slugify(title.toLowerCase().trim());
  let requestData={course,category,instructor,branch,title,slug,banner,image,description,duration,questions,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
 let countData= await  Quiz.count(conditions);
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
  let newQuiz = new Quiz(requestData);

   newQuiz.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Quiz already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding quiz.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Quiz created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {quiz_id}=     req.params;
     const quizDetails = await Quiz.findOne({ _id: quiz_id}).populate('course',{title:1,_id:1}).populate('branch',{title:1,_id:1}).populate('category',{title:1,_id:1}).populate('instructor',{name:1,_id:1}).populate('questions',{title:1,_id:1});

     if(quizDetails)
          return sendSuccess(quizDetails, res, 200, "Quiz details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching quiz details.")

}

const update = async (req, res) => {
 let {course,category,instructor,title,banner,branch,image,description,duration,questions,metaTitle,metaDescription,status}= req.body;
 let slug=slugify(title.toLowerCase().trim());
   let {quiz_id}=req.params;
   try{
    const quizDetails = await Quiz.findOne({ _id: quiz_id});
    if(quizDetails){
        if(quizDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(quizDetails.image && quizDetails.image!="" && quizDetails.image!==image){
                    unlink(quizDetails.image, (err) => {
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
        if(quizDetails.banner!==banner){
            try{
                banner=  await uploadFile(banner, slug);
                if(quizDetails.banner && quizDetails.banner!="" && quizDetails.banner!==banner){
                    unlink(quizDetails.banner, (err) => {
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
            let quiz = await Quiz.findOneAndUpdate({ _id: ObjectId(quizDetails.id) },
                { $set: {course,category,instructor,branch,title,banner,image,description,duration,questions,metaTitle,metaDescription,status} },
                { new: true });
           
            return sendSuccess(quiz, res, 200, "Quiz updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating quiz.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating quiz.")
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


    let total_records= await Quiz.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Quiz.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Quiz list.");
       
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

        conditions={status:'ACTIVE', title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Quiz.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
        return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {quiz_id}=     req.params;
     const quizDetails = await Quiz.findOne({ _id: quiz_id});

     if(quizDetails){
        await Quiz.remove({ _id: quiz_id});

        return sendSuccess(quizDetails, res, 200, "Quiz deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting quiz.")
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