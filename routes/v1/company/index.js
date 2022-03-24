const { Router }= require('express');
const router = Router();
const CompanyController=require('../../../controllers/company/company.controller');
const CompanyValidator=require('../../../middlewares/validation/companyValidation');
const { companyAuth }  = require('../../../middlewares/auth-company');





router.post('/login',CompanyValidator.login,CompanyController.login);
router.get('/',CompanyController.listAll);
router.get('/search',CompanyController.search);
router.get('/:company_id',CompanyController.view);
router.post('/',CompanyValidator.create,CompanyController.create);
router.put('/:company_id',CompanyValidator.update,CompanyController.update);
router.delete('/:company_id',CompanyController.destroy);

module.exports = router;