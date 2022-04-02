const { Router }= require('express');
const router = Router();
const SubjectController=require('../../../controllers/subject/subject.controller');
const  SubjectValidator=require('../../../middlewares/validation/subjectValidation');

router.get('/',SubjectController.listAll);
router.get('/search',SubjectController.search);
router.get('/:subject_id',SubjectController.view);
router.get('/getsubjectid/:name',SubjectController.getsubjectid);
router.post('/',SubjectValidator.create,SubjectController.create);
router.put('/:subject_id',SubjectValidator.update,SubjectController.update);
router.delete('/:subject_id',SubjectController.destroy);

module.exports = router;