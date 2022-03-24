const { Router }= require('express');
const router = Router();
const FaqController=require('../../../controllers/faq/faq.controller');
const FaqValidator=require('../../../middlewares/validation/faqValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,FaqController.listAll);
router.get('/search',FaqController.search);
router.get('/:faq_id',adminAuth,FaqController.view);
router.post('/',adminAuth,FaqValidator.create,FaqController.create);
router.put('/:faq_id',adminAuth,FaqValidator.update,FaqController.update);
router.delete('/:faq_id',adminAuth,FaqController.destroy);

module.exports = router;