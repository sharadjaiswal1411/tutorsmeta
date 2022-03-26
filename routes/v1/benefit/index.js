 const {Router} = require('express');
 const router = Router();
 const BenefitController = require('../../../controllers/benefit/benefit.controller');
 const BenefitValidator = require('../../../middlewares/validation/benefitValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,BenefitController.listAll);
router.get('/:benefit_id',adminAuth,BenefitController.view);
router.post('/',adminAuth,BenefitValidator.create,BenefitController.create);
router.put('/:benefit_id',adminAuth,BenefitValidator.update,BenefitController.update);
router.delete('/:benefit_id',adminAuth,BenefitController.destroy);


module.exports = router;