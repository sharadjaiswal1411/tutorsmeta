 const {Router} = require('express');
 const router = Router();
 const MembershipController = require('../../../controllers/membership/membership.controller');
 const MembershipValidator = require('../../../middlewares/validation/membershipValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,MembershipController.listAll);
 router.get('/search',MembershipController.search);
router.get('/:membership_id',adminAuth,MembershipController.view);
router.post('/',adminAuth,MembershipValidator.create,MembershipController.create);
router.put('/:membership_id',adminAuth,MembershipValidator.update,MembershipController.update);
router.delete('/:membership_id',adminAuth,MembershipController.destroy);


module.exports = router;