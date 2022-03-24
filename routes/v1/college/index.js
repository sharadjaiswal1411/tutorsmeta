const { Router }= require('express');
const router = Router();
const CollegeController=require('../../../controllers/college/college.controller');
const CollegeValidator=require('../../../middlewares/validation/collegeValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,CollegeController.listAll);
router.get('/search',CollegeController.search);
router.get('/:college_id',adminAuth,CollegeController.view);
router.post('/',adminAuth,CollegeValidator.create,CollegeController.create);
router.put('/:college_id',adminAuth,CollegeValidator.update,CollegeController.update);
router.delete('/:college_id',adminAuth,CollegeController.destroy);

module.exports = router;