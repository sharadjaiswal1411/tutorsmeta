const { Router }= require('express');
const router = Router();
const AuthController=require('../../../controllers/auth/auth.controller');
const AuthValidator=require('../../../middlewares/validation/authValidation');
const { adminAuth }  = require('../../../middlewares/auth-user');

router.post('/login',AuthValidator.login,AuthController.login);
router.post('/register',AuthValidator.register,AuthController.register);
router.post('/forgot-password',AuthValidator.forgotPassword,AuthController.forgotPassword);
router.get('/test',AuthController.testFunction);

module.exports = router;