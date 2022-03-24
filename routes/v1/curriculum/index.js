const { Router }= require('express');
const router = Router();
const CurriculumController=require('../../../controllers/curriculum/curriculum.controller');
const CurriculumValidator=require('../../../middlewares/validation/curriculumsValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,CurriculumController.listAll);
router.get('/search',CurriculumController.search);
router.get('/:curriculum_id',adminAuth,CurriculumController.view);
router.post('/',adminAuth,CurriculumValidator.create,CurriculumController.create);
router.put('/:curriculum_id',adminAuth,CurriculumValidator.update,CurriculumController.update);
router.delete('/:curriculum_id',adminAuth,CurriculumController.destroy);

module.exports = router;