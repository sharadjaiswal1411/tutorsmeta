const { User, ObjectId } = require('../../models/user');
const { Role} = require('../../models/role');
const { PASSWORD } = require('../../constant/common');
const bcrypt = require('bcryptjs');
const { sendCustomError, sendSuccess } = require('../../helper/response');

const create = async (req, res) => {

  let {name,email,phoneCode,mobileNumber,image,cityId,deviceType,password,status}=     req.body;
  let userRole=await Role.findOne({'name':"USER"});


  if(!userRole){
    return sendCustomError({}, res,500, 'USER role not exists.')
  }else{

    let roleId=userRole._id;

    email = email.toLowerCase()
    const userDetails = await User.findOne({ email });
    if (userDetails) {
        return sendCustomError({}, res, 422, 'Email already registered.')
    }

    const phoneDetails = await User.findOne({ phoneCode,mobileNumber });
    if (phoneDetails) {
        return sendCustomError({}, res, 422, 'Mobile number already registered.')
    }


    const salt = bcrypt.genSaltSync(PASSWORD.SALT_LENGTH);
    password = bcrypt.hashSync(password.trim(), salt);
    let requestData={name,roleId,status,email,phoneCode,mobileNumber,password,image,cityId,deviceType};
    let newUser = new User(requestData);
  
    newUser.save(async (err, data) => {
      if(err){
  
          if(err.code==11000){
             
              return sendCustomError({}, res, err.code, 'User already exists.')
          }else{
              
               console.log(err)
               return sendCustomError({}, res, err.code, 'Error in adding user.')
          }
         
      }else{
       return sendSuccess(data, res, 200, "User created successfully.");
      }
  
     })
  }


}



const view = async (req, res) => {
let {user_id}=     req.params;
     const userDetails = await User.findOne({ _id: user_id},{password:0,deviceToken:0,accessToken:0,resetToken:0 }).populate("cityId","name").populate("categories","name");

     if(userDetails){
		
		  return sendSuccess(userDetails, res, 200, "User details.");
     }else
       return sendCustomError({}, res, 500, "Error in fetching user details.")

}

const update = async (req, res) => {
   let {name,status,password,email,phoneCode,mobileNumber,image,cityId,deviceType}=  req.body;
   let {user_id}= req.params;
   try{
	password=(password) ? password : ""
    const userDetails = await User.findOne({ _id: user_id});

    if(userDetails){
       
        email = email.toLowerCase()
        if(userDetails.email!=email){
            const userDetails = await User.findOne({ email});
            if (userDetails) {
                return sendCustomError({}, res, 422, 'Email already taken.')
            }
        }
       

        if(userDetails.mobileNumber!=mobileNumber && userDetails.phoneCode!=phoneCode){
            const phoneDetails = await User.findOne({ phoneCode,mobileNumber });
            if (phoneDetails) {
                return sendCustomError({}, res, 422, 'Mobile number already taken.')
            }
        }

       if(password.length){
        const salt = bcrypt.genSaltSync(PASSWORD.SALT_LENGTH);
        password = bcrypt.hashSync(password.trim(), salt);

       }else{
		 password  =userDetails.password;
	   }
       let user = await User.findOneAndUpdate({ _id: ObjectId(userDetails.id) },
                { $set: { name,password,status,email,phoneCode,mobileNumber,image,cityId,deviceType } },
                { new: true });
            
            return sendSuccess(user, res, 200, "User updated successfully.");
       
    }else{
           
            return sendCustomError({}, res,500, "Invalid user id.")

    }
          


   }
   catch(e){
      return sendCustomError({}, res, e.code, "Error in updating user.")
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
   
    let userRole=await Role.findOne({'name':"USER"});

    if(!userRole){
        return sendCustomError({}, res, 500, "No user role found.")
    }else{
        let conditions={roleId:userRole._id};

        if(search_text.length>0){

            conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};
    
        }

        let total_records= await User.count(conditions);

        let total_pages=Math.ceil(total_records/per_page);
        let meta={
            current_page:current_page,
            per_page:per_page,
            total_pages:total_pages,
            total_records:total_records
        }

       
            await   User.find(conditions, {password:0,deviceToken:0,accessToken:0,resetToken:0 }).populate("cityId","name").limit(per_page).skip(offset).sort(order_by).then(results => {
                let data={
                    'results':results,
                    'meta':meta
                }
                return sendSuccess(data, res, 200, "Users list.");
               
            });

    }
    

}  

const search = async (req, res) => {
   
   let search_text= (req.query.search_text)?req.query.search_text:"";
   let field_name= (req.query.order_by)?req.query.order_by:"";
    let order= (req.query.order)?req.query.order:"";
    let order_by={};
    if(field_name.length>0 && order.length>0 ){
    order_by[field_name]=order;
    }else{
            order_by['name']=1;
    }
  


   let userRole=await Role.findOne({'name':"USER"});

   if(!userRole){
       return sendCustomError({}, res, 500, "No user role found.")
   }else{
       let conditions={roleId:userRole._id,status:true};

        if(search_text.length>0){

            conditions={ name: { $regex: '.*' + search_text + '.*' ,'$options' : 'i'}};

        }

   await   User.find(conditions, {_id:1,name:1,sort:order_by}).populate("cityId","name").sort(order_by).then(results => {
    let data={
        'results':results,
        }
    return sendSuccess(data, res, 200, "Users list.");
   
});



   }
   
}


const destroy = async (req, res) => {
 let {user_id}=     req.params;
     const userDetails = await User.findOne({ _id: user_id});

     if(userDetails){
        await User.remove({ _id: user_id});

        return sendSuccess(userDetails, res, 200, "User deleted successfully.");

     }   
     else{
         
         return sendCustomError({}, res, 500, "Error in deleting user.")
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