 const {Router} = require('express');
 const router = Router();
 const BranchController = require('../../../controllers/branch/branch.controller');
 const BranchValidator = require('../../../middlewares/validation/branchValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,BranchController.listAll);
 router.get('/search',BranchController.search);
router.get('/:branch_id',adminAuth,BranchController.view);
router.post('/',adminAuth,BranchValidator.create,BranchController.create);
router.put('/:branch_id',adminAuth,BranchValidator.update,BranchController.update);
router.delete('/:branch_id',adminAuth,BranchController.destroy);


module.exports = router;