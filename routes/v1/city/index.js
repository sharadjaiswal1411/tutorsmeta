const { Router }= require('express');
const router = Router();
const CityController=require('../../../controllers/city/city.controller');
const CityValidator=require('../../../middlewares/validation/cityValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,CityController.listAll);
router.get('/search',CityController.search);
router.get('/:city_id',adminAuth,CityController.view);
router.post('/',adminAuth,CityValidator.create,CityController.create);
router.put('/:city_id',adminAuth,CityValidator.update,CityController.update);
router.delete('/:city_id',adminAuth,CityController.destroy);

module.exports = router;