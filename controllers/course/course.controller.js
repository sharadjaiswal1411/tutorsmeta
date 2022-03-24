const { Course, ObjectId } = require('../../models/course');
const { sendCustomError, sendSuccess } = require('../../helper/response');
const {uploadFile}= require('../../helper/fileRelocation');
const {uploadVideo}= require('../../helper/videoRelocation');
const  slugify = require('slugify');
const { unlink } = require('fs');

const create = async (req, res) => {
let {branch,category,instructor,featured,city,title,banner,image,video,description,duration,
      fees,certification,benefits,type,metaTitle,metaDescription,status} =  req.body;
      let slug=slugify(title.toLowerCase().trim());
  let requestData={branch,category,instructor,city,featured,title,slug,banner,image,video,description,duration,
                    fees,certification,benefits,type,metaTitle,metaDescription,status};
                    let conditions={};

                    if(requestData.title){
                  
                      conditions={title: { $regex: '.*' + requestData.title + '.*' }};
                  
                  }
                  let countData= await  Course.count(conditions);
                  
                  if(countData==0){
                      if (requestData.image) {
                          try{
                              requestData['image']=  await uploadFile(requestData.image, slug);
                          } 
                        catch(e){
                          requestData['image']=null;
                        }
                      }
                      if (requestData.banner) {
                          try{
                              requestData['banner']=  await uploadFile(requestData.banner, slug+'-banner');
                          } 
                        catch(e){
                          requestData['banner']=null;
                        }
                      }
                      if (requestData.video) {
                        try{
                            requestData['video']=  await uploadVideo(requestData.video, slug+'-video');
                        } 
                      catch(e){
                        requestData['video']=null;
                      }
                    }
                   }
  let newCourse = new Course(requestData);

   newCourse.save(async (err, data) => {
    if(err){

        if(err.code==11000){
            return sendCustomError({}, res, err.code, 'Course already exists.')
        }else{
           
             return sendCustomError({}, res, 500, 'Error in adding course.')
        }
       
    }else{
     return sendSuccess(data, res, 200, "Course created successfully.");
    }

   })


}



const view = async (req, res) => {
 let {course_id}=     req.params;
     const courseDetails = await Course.findOne({ _id: course_id}).populate('branch',{ title: 1,_id:1 }).populate('category',{title:1,_id:1}).populate('instructor',{name:1,_id:1}).populate('city',{title:1,_id:1});

     if(courseDetails)
          return sendSuccess(courseDetails, res, 200, "Course details.");
     else
       return sendCustomError({}, res, 500, "Error in fetching course details.")

}

const update = async (req, res) => {
 let {branch,category,instructor,city,title,featured,banner,image,video,description,duration,
         fees,certification,benefits,type,metaTitle,metaDescription,status}= req.body;
   let {course_id}=req.params;
   let slug=slugify(title.toLowerCase().trim());
   try{
    const courseDetails = await Course.findOne({ _id: course_id});
    if(courseDetails){
        if(courseDetails.image!==image){
            try{
                image = await uploadFile(image, slug);
                if(courseDetails.image && courseDetails.image!="" && courseDetails.image!==image){
                    unlink(courseDetails.image, (err) => {
                        if (err) 
                         console.log(err);
                    });
                }
            } 
          catch(e){
            image=image;
          }
        }

        if(courseDetails.banner!==banner){
            try{
                video=  await uploadFile(banner, slug);
                if(courseDetails.banner && courseDetails.banner!="" && courseDetails.banner!==banner){
                    unlink(courseDetails.banner, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            banner=banner;
          }
        }

        if(courseDetails.video!==video){
            try{
                video=  await uploadVideo(video, slug);
                if(courseDetails.video && courseDetails.video!="" && courseDetails.video!==video){
                    unlink(courseDetails.video, (err) => {
                        if (err) 
                        console.log('err',err);
                    });
                }
            } 
          catch(e){
            video=video;
          }
        }
            let course = await Course.findOneAndUpdate({ _id: ObjectId(courseDetails.id) },
                { $set: {branch,category,instructor,city,featured,title,banner,image,video,description,duration,
                          fees,certification,benefits,type,metaTitle,metaDescription,status } },
                { new: true });
           
            return sendSuccess(course, res, 200, "Course updated successfully.");
       
    }else{
           
            return sendCustomError({}, res, 500, "Error in updating course.")

    }
   
   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating Course.")
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

        conditions={ status:status ,title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    if(search_text.length==0 && status.length>0){

            conditions={ status:status };

        }


     if(search_text.length>0 && status.length==0){

            conditions={ title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

        }
    let total_records= await Course.count(conditions);
    let total_pages=Math.ceil(total_records/per_page);
    let meta={
        current_page:current_page,
        per_page:per_page,
        total_pages:total_pages,
        total_records:total_records
    }

    Course.find(conditions,{}, { skip: offset, limit: per_page,sort:order_by }, function(err, results) {
        let data={
            'results':results,
            'meta':meta
        }
        return sendSuccess(data, res, 200, "Course list.");
       
    });

}

const search = async (req,res) => {
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

        conditions={title: { $regex: '.*' + search_text + '.*' ,'$options' : 'i' }};

    }

    Course.find(conditions,{_id:1,title:1,sort:order_by}, function(err, results) {
     
        // let data={
        //     'results':results
        
        // }
        return res.status(200).json(results);
        
       
    });
  
  
}


const destroy = async (req, res) => {
 let {course_id}=     req.params;
     const courseDetails = await Course.findOne({ _id: course_id});

     if(courseDetails){
        await Course.remove({ _id: course_id});

        return sendSuccess(courseDetails, res, 200, "Course deleted successfully.");

     }   
     else{
         return sendCustomError({}, res, 500, "Error in deleting course.")
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