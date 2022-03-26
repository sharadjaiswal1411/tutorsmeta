const { Router }= require('express');
const router = Router();
const ServiceController=require('../../../controllers/frontend/service/service.controller');
const {userAuth} = require('../../../middlewares/auth-user');

router.get('/',ServiceController.index);
router.get('/:slug',ServiceController.view);

module.exports = router;