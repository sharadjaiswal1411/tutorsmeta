const { Router }= require('express');
const router = Router();
const StudentController=require('../../../controllers/student/student.controller');
const  StudentValidator=require('../../../middlewares/validation/studentValidation');
const { studentAuth }  = require('../../../middlewares/auth-student');




router.post('/login',StudentValidator.login,StudentController.login);
router.get('/',StudentController.listAll);
 router.get('/search',StudentController.search);
router.get('/:student_id',StudentController.view);
router.post('/',StudentValidator.create,StudentController.create);
router.put('/:student_id',StudentValidator.update,StudentController.update);
router.delete('/:student_id',StudentController.destroy);

module.exports = router;