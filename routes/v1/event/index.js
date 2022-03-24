const { Router }= require('express');
const router = Router();
const EventController=require('../../../controllers/event/event.controller');
const EventValidator=require('../../../middlewares/validation/eventValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,EventController.listAll);
router.get('/search',EventController.search);
router.get('/:event_id',adminAuth,EventController.view);
router.post('/',adminAuth,EventValidator.create,EventController.create);
router.put('/:event_id',adminAuth,EventValidator.update,EventController.update);
router.delete('/:event_id',adminAuth,EventController.destroy);

module.exports = router;