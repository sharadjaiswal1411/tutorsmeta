const { Router }= require('express');
var slugify = require('slugify')
const router = Router();
let multer  = require('multer');
const FileController=require('../../../controllers/file/file.controller');



const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

temp_path="temp"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, temp_path);
    },
    filename: (req, file, cb) => {
       
        cb(null,slugify(Date.now()+"-"+file.originalname.toLowerCase()));
    }
});


const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/upload',upload.single('filename'), FileController.uploadFile);


module.exports = router;