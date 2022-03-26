const { Router }= require('express');
const router = Router();
const ServiceController=require('../../../controllers/service/service.controller');
const  ServiceValidator=require('../../../middlewares/validation/serviceValidation');
const {userAuth, adminAuth} = require('../../../middlewares/auth-user');

router.get('/',adminAuth,ServiceController.listAll);
router.get('/search',ServiceController.search);
router.get('/:service_id',adminAuth,ServiceController.view);
router.post('/',adminAuth,ServiceValidator.create,ServiceController.create);
router.put('/:service_id',adminAuth,ServiceValidator.update,ServiceController.update);
router.delete('/:service_id',adminAuth,ServiceController.destroy);

module.exports = router;