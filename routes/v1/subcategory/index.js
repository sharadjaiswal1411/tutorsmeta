 const {Router} = require('express');
 const router = Router();
 const SubCategoryController = require('../../../controllers/subcategory/subcategory.controller');
 const SubCategoryValidator = require('../../../middlewares/validation/subcategoryValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,SubCategoryController.listAll);
 router.get('/search',SubCategoryController.search);
router.get('/:subcategory_id',adminAuth,SubCategoryController.view);
router.post('/',adminAuth,SubCategoryValidator.create,SubCategoryController.create);
router.put('/:subcategory_id',adminAuth,SubCategoryValidator.update,SubCategoryController.update);
router.delete('/:subcategory_id',adminAuth,SubCategoryController.destroy);


module.exports = router;