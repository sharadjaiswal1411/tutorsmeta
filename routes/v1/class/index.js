 const {Router} = require('express');
 const router = Router();
 const ClassController = require('../../../controllers/class/class.controller');
 const ClassValidator = require('../../../middlewares/validation/classValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,ClassController.listAll);
 router.get('/search',ClassController.search);
router.get('/:class_id',adminAuth,ClassController.view);
router.post('/',adminAuth,ClassValidator.create,ClassController.create);
router.put('/:class_id',adminAuth,ClassValidator.update,ClassController.update);
router.delete('/:class_id',adminAuth,ClassController.destroy);


module.exports = router;