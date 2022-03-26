const fs = require('fs');
const uploadVideo = async (file_name,slug) => {    
    // let oldPath = '/var/www/html/static/temp/';
    // let destPath = 'uploads/products/' + new Date().getFullYear() + '/' + new Date().getMonth() + '/'
    // let newPath = '/var/www/html/static/' + destPath;
  
    let oldPath = 'temp/';
    let destPath = 'uploads/' + new Date().getFullYear() + '/' + new Date().getMonth() + '/'
    let newPath = destPath;

  if (!fs.existsSync(newPath)) {
     fs.mkdirSync(newPath,{recursive: true}, function(err) {
       
       newPath = newPath + slug + '.mp4';
       oldPath = oldPath + file_name;
       
       fs.renameSync(oldPath, newPath, async function(err) {
         
       });


     });

  }else{

       newPath = newPath + slug + '.mp4';
       oldPath = oldPath + file_name;

        fs.renameSync(oldPath, newPath, async function(err) {
         
       });

       
  }


   return destPath + slug + '.mp4';
}


module.exports = {
  uploadVideo


}
