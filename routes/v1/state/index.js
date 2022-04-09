const { Router }= require('express');
const router = Router();
const StateController=require('../../../controllers/state/State.controller');
const StateValidator=require('../../../middlewares/validation/stateValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,StateController.listAll);
router.get('/search',StateController.search);
router.get('/:state_id',adminAuth,StateController.view);
router.post('/',adminAuth,StateValidator.create,StateController.create);
router.put('/:state_id',adminAuth,StateValidator.update,StateController.update);
router.delete('/:state_id',adminAuth,StateController.destroy);

module.exports = router;