const { Router }= require('express');
const router = Router();
const IdproofController=require('../../../controllers/idproof/idproof.controller');
const  IdproofValidator=require('../../../middlewares/validation/idproofValidation');

router.get('/',IdproofController.listAll);
router.get('/search',IdproofController.search);
router.get('/:idproof_id',IdproofController.view);

router.post('/',IdproofValidator.create,IdproofController.create);
router.put('/:idproof_id',IdproofValidator.update,IdproofController.update);
router.delete('/:idproof_id',IdproofController.destroy);

module.exports = router;