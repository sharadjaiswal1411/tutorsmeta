const { Router }= require('express');
const router = Router();
const CountryController=require('../../../controllers/country/country.controller');
const CountryValidator=require('../../../middlewares/validation/countryValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,CountryController.listAll);
router.get('/search',CountryController.search);
router.get('/:country_id',adminAuth,CountryController.view);
router.post('/',adminAuth,CountryValidator.create,CountryController.create);
router.put('/:country_id',adminAuth,CountryValidator.update,CountryController.update);
router.delete('/:country_id',adminAuth,CountryController.destroy);

module.exports = router;