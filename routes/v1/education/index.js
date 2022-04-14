const { Router }= require('express');
const router = Router();
const EducationController=require('../../../controllers/education/education.controller');
const  EducationValidator=require('../../../middlewares/validation/educationValidation');

router.get('/',EducationController.listAll);
router.get('/search',EducationController.search);
router.get('/:education_id',EducationController.view);

router.post('/',EducationValidator.create,EducationController.create);
router.put('/:education_id',EducationValidator.update,EducationController.update);
router.delete('/:education_id',EducationController.destroy);

module.exports = router;