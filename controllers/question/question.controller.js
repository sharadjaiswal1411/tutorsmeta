const { Question, ObjectId } = require('../../models/question');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const { unlink } = require('fs');
const  slugify = require('slugify');

const create = async (req, res) => {
let {title,image,quiz,option1,option2,option3,option4,description,correct,metaTitle,metaDescription,status} =  req.body;
  let slug=slugify(title.toLowerCase().trim());
  let requestData={title,quiz,image,option1,option2,option3,option4,description,correct,metaTitle,metaDescription,status};
  let conditions={};

  if(requestData.title){

    conditions={title: { $regex: '.*' + requestData.title + '.*' }};

}
 let countData= await  Question.count(conditions);
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
  let newQuestion = new Question(requestData);

   newQuestion.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Question already exists.')
        }else{
             return sendCustomError({}, res, 500, 'Error in adding question.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Question created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {question_id}=     req.params;
     const questionDetails = await Question.findOne({ _id: question_id}).populate('quiz',{title:1,_id:1});

     if(questionDetails)
          return sendSuccess(questionDetails, res, 200, "Question details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching otp details.")

}

const update = async (req, res) => {
 let {title,image,option1,option2,quiz,option3,option4,description,correct,metaTitle,metaDescription,status}= req.body;
   let {question_id}=req.params;
     let slug=slugify(title.toLowerCase().trim());
   try{
    const questionDetails = await Question.findOne({ _id: question_id});
    if(questionDetails){
           if(questionDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(questionDetails.image && questionDetails.image!="" && questionDetails.image!==image){
                    unlink(questionDetails.image, (err) => {
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
            let question = await Question.findOneAndUpdate({ _id: ObjectId(questionDetails.id) },
                { $set: {title,image,option1,quiz,option2,option3,option4,description,correct,metaTitle,metaDescription,status} },
                { new: true });
           
            return sendSuccess(question, res, 200, "Question updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating question.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating question.")
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


    let total_records= await Question.count(conditions);

    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Question.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Question list.");
       
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

    Question.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        
       return res.status(200).json(results);
       
    });
  
}


const destroy = async (req, res) => {
 let {question_id}=     req.params;
     const questionDetails = await Question.findOne({ _id: question_id});

     if(questionDetails){
        await Question.remove({ _id: question_id});

        return sendSuccess(questionDetails, res, 200, "Question deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting question.")
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