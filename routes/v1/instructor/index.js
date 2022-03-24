const { Router }= require('express');
const router = Router();
const InstructorController=require('../../../controllers/instructor/instructor.controller');
const  InstructorValidator=require('../../../middlewares/validation/instructorValidation');
 const { instructorAuth }  = require('../../../middlewares/auth-instructor');


router.post('/login',InstructorValidator.login,InstructorController.login);
 router.get('/',InstructorController.listAll);
 router.get('/search',InstructorController.search);
router.get('/:instructor_id',InstructorController.view);
router.post('/',InstructorValidator.create,InstructorController.create);
router.put('/:instructor_id',InstructorValidator.update,InstructorController.update);
router.delete('/:instructor_id',InstructorController.destroy);


module.exports = router;