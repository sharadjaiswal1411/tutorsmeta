const { Router }= require('express');
const router = Router();
const CourseController=require('../../../controllers/course/course.controller');
const  CourseValidator=require('../../../middlewares/validation/courseValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');


router.get('/',adminAuth,CourseController.listAll);
router.get('/search',CourseController.search);
router.get('/:course_id',adminAuth,CourseController.view);
router.post('/',adminAuth,CourseValidator.create,CourseController.create);
router.put('/:course_id',adminAuth,CourseValidator.update,CourseController.update);
router.delete('/:course_id',adminAuth,CourseController.destroy);

module.exports = router;