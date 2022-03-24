const { Router }= require('express');
const router = Router();
const CompanyTypeController=require('../../../controllers/company_type/company_type.controller');
const CompanyTypeValidator=require('../../../middlewares/validation/company_typeValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,CompanyTypeController.listAll);
router.get('/search',CompanyTypeController.search);
router.get('/:company_type_id',adminAuth,CompanyTypeController.view);
router.post('/',adminAuth,CompanyTypeValidator.create,CompanyTypeController.create);
router.put('/:company_type_id',adminAuth,CompanyTypeValidator.update,CompanyTypeController.update);
router.delete('/:company_type_id',adminAuth,CompanyTypeController.destroy);

module.exports = router;