const { Router }= require('express');
const router = Router();
const UserController=require('../../../controllers/users/user.controller');
const UserValidator=require('../../../middlewares/validation/userValidation');
const { userAuth,adminAuth }  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,UserController.listAll);
router.get('/search',UserController.search);
router.get('/:user_id',userAuth,UserController.view);
router.post('/',userAuth,UserValidator.create,UserController.create);
router.put('/:user_id',userAuth,UserValidator.update,UserController.update);
router.delete('/:user_id',adminAuth,UserController.destroy);

module.exports = router;