const { Router }= require('express');
const router = Router();
const Event_RegistrationController=require('../../../controllers/event_registration/event_registration.controller');
const Event_RegistrationValidator=require('../../../middlewares/validation/event_registrationValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,Event_RegistrationController.listAll);
router.get('/search',Event_RegistrationController.search);
router.get('/:event_registration_id',adminAuth,Event_RegistrationController.view);
router.post('/',adminAuth,Event_RegistrationValidator.create,Event_RegistrationController.create);
router.put('/:event_registration_id',adminAuth,Event_RegistrationValidator.update,Event_RegistrationController.update);
router.delete('/:event_registration_id',adminAuth,Event_RegistrationController.destroy);

module.exports = router;