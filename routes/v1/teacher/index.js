 const {Router} = require('express');
 const router = Router();
 const TeacherController = require('../../../controllers/teacher/teacher.controller');
 const TeacherValidator = require('../../../middlewares/validation/teacherValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,TeacherController.listAll);
 router.get('/search',TeacherController.search);
router.get('/:teacher_id',adminAuth,TeacherController.view);
router.post('/',adminAuth,TeacherValidator.create,TeacherController.create);
router.put('/:teacher_id',adminAuth,TeacherValidator.update,TeacherController.update);
router.delete('/:teacher_id',adminAuth,TeacherController.destroy);


module.exports = router;