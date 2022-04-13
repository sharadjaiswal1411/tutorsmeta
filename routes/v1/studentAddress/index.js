const { Router }= require('express');
const router = Router();
const StudentAddressController=require('../../../controllers/studentAddress/studentAddress.controller');
const  StudentAddressValidator=require('../../../middlewares/validation/studentAddressValidation');

router.get('/',StudentAddressController.listAll);
router.get('/search',StudentAddressController.search);
router.get('/:studentAddress_id',StudentAddressController.view);

router.post('/',StudentAddressValidator.create,StudentAddressController.create);
router.put('/:studentAddress_id',StudentAddressValidator.update,StudentAddressController.update);
router.delete('/:studentAddress_id',StudentAddressController.destroy);

module.exports = router;