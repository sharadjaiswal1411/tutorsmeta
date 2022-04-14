const { Router }= require('express');
const router = Router();
const CertificationController=require('../../../controllers/certification/certification.controller');
const  CertificationValidator=require('../../../middlewares/validation/certificationValidation');

router.get('/',CertificationController.listAll);
router.get('/search',CertificationController.search);
router.get('/:certification_id',CertificationController.view);

router.post('/',CertificationValidator.create,CertificationController.create);
router.put('/:certification_id',CertificationValidator.update,CertificationController.update);
router.delete('/:certification_id',CertificationController.destroy);

module.exports = router;