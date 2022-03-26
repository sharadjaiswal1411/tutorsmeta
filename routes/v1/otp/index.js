const { Router }= require('express');
const router = Router();
const OtpController=require('../../../controllers/otp/otp.controller');
const  OtpValidator=require('../../../middlewares/validation/otpValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,OtpController.listAll);
router.get('/:otp_id',adminAuth,OtpController.view);
router.post('/',adminAuth,OtpValidator.create,OtpController.create);
router.put('/:otp_id',adminAuth,OtpValidator.update,OtpController.update);
router.delete('/:otp_id',adminAuth,OtpController.destroy);


module.exports = router;