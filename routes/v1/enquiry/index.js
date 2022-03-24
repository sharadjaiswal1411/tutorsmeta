const { Router }= require('express');
const router = Router();
const EnquiryController=require('../../../controllers/enquiry/enquiry.controller');
const EnquiryValidator=require('../../../middlewares/validation/enquiryValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,EnquiryController.listAll);
router.get('/search',EnquiryController.search);
router.get('/:enquiry_id',adminAuth,EnquiryController.view);
router.post('/',adminAuth,EnquiryValidator.create,EnquiryController.create);
router.put('/:enquiry_id',adminAuth,EnquiryValidator.update,EnquiryController.update);
router.delete('/:enquiry_id',adminAuth,EnquiryController.destroy);

module.exports = router;