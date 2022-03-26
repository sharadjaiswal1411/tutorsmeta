const { Router }= require('express');
const router = Router();
const PersonController=require('../../../controllers/person/person.controller');
const  PersonValidator=require('../../../middlewares/validation/personValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,PersonController.listAll);
  router.get('/search',PersonController.search);
router.get('/:person_id',adminAuth,PersonController.view);
router.post('/',adminAuth,PersonValidator.create,PersonController.create);
router.put('/:person_id',adminAuth,PersonValidator.update,PersonController.update);
router.delete('/:person_id',adminAuth,PersonController.destroy);


module.exports = router;