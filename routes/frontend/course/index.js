const { Router }= require('express');
const router = Router();
const CourseController=require('../../../controllers/frontend/course/course.controller');
const {userAuth} = require('../../../middlewares/auth-user');

router.get('/',CourseController.listAll);
router.get('/:slug',CourseController.view);

module.exports = router;