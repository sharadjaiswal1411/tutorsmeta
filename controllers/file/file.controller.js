
async function uploadFile(req,res){

    if (!req.file) {
      
       return res.send({
         success: false,
         message:"No file provided"
       });
   
     } else {
      
       return res.send({
         success: true,
         filename:req.file.filename,
         message:"File Uploaded Successfully"
       })
     }
   }

 module.exports = {
    uploadFile

};