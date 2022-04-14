const { Router }= require('express');
const router = Router();
const TeacherAddressController=require('../../../controllers/teacherAddress/teacherAddress.controller');
const  TeacherAddressValidator=require('../../../middlewares/validation/teacherAddressValidation');

router.get('/',TeacherAddressController.listAll);
router.get('/search',TeacherAddressController.search);
router.get('/:teacherAddress_id',TeacherAddressController.view);

router.post('/',TeacherAddressValidator.create,TeacherAddressController.create);
router.put('/:teacherAddress_id',TeacherAddressValidator.update,TeacherAddressController.update);
router.delete('/:teacherAddress_id',TeacherAddressController.destroy);

module.exports = router;