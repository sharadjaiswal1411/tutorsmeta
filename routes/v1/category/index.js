 const {Router} = require('express');
 const router = Router();
 const CategoryController = require('../../../controllers/category/category.controller');
 const CategoryValidator = require('../../../middlewares/validation/categoryValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,CategoryController.listAll);
 router.get('/search',CategoryController.search);
router.get('/:category_id',adminAuth,CategoryController.view);
router.post('/',adminAuth,CategoryValidator.create,CategoryController.create);
router.put('/:category_id',adminAuth,CategoryValidator.update,CategoryController.update);
router.delete('/:category_id',adminAuth,CategoryController.destroy);


module.exports = router;