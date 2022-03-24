 const {Router} = require('express');
 const router = Router();
 const AddressController = require('../../../controllers/address/address.controller');
 const AddressValidator = require('../../../middlewares/validation/addressValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



router.get('/',adminAuth,AddressController.listAll);
 router.get('/search',AddressController.search);
router.get('/:address_id',adminAuth,AddressController.view);
router.post('/',adminAuth,AddressValidator.create,AddressController.create);
router.put('/:address_id',adminAuth,AddressValidator.update,AddressController.update);
router.delete('/:address_id',adminAuth,AddressController.destroy);


module.exports = router;