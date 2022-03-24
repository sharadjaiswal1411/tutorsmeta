const { Router }= require('express');
const router = Router();
const CategoryController=require('../../../controllers/frontend/category/category.controller');

router.get('/',CategoryController.listAll);
router.get('/:slug',CategoryController.view);

module.exports = router;