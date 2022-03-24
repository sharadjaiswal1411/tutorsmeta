const { Category, ObjectId } = require('../../../models/category');
const { sendCustomError, sendSuccess } = require('../../../helper/response');
const { env } = process;
const CryptoJS = require("crypto-js");


const view = async (req, res) => {
    let {slug}=     req.params;
     const categoryDetails = await Category.findOne({ slug: slug});

     if(categoryDetails){
        let original=JSON.stringify(categoryDetails)
        let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();
        return sendSuccess(ciphertext, res, 200, "Category details.");
     }
          
     else
       return sendCustomError({}, res, 500, "Error in fetching Category details.")

}



const listAll = async (req, res) => {
    let order_by={title:1};
    let per_page=1000;
    let offset=0;
   let conditions={'status':'ACTIVE','parent':null}
  Category.find(conditions).populate("branch", { title: 1,slug:1 }).limit(per_page).skip(offset).sort(order_by).then(results => {
    // let original=JSON.stringify(results)
    // let ciphertext = CryptoJS.AES.encrypt(original,env.SECRET).toString();

    return sendSuccess(results, res, 200, "Categories list."); 
});

 

}

module.exports = {
    view,
    listAll
};