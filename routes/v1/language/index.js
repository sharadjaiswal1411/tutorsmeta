const { Router }= require('express');
const router = Router();
const LanguageController=require('../../../controllers/language/language.controller');
const  LanguageValidator=require('../../../middlewares/validation/languageValidation');

router.get('/',LanguageController.listAll);
router.get('/search',LanguageController.search);
router.get('/:language_id',LanguageController.view);
//router.get('/getLanguageid/:name',LanguageController.getLanguageid);
router.post('/',LanguageValidator.create,LanguageController.create);
router.put('/:language_id',LanguageValidator.update,LanguageController.update);
router.delete('/:language_id',LanguageController.destroy);

module.exports = router;