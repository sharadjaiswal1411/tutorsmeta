const { Router }= require('express');
const router = Router();
const SectionController=require('../../../controllers/section/section.controller');
const  SectionValidator=require('../../../middlewares/validation/sectionValidation');
const {userAuth, adminAuth} = require('../../../middlewares/auth-user');

router.get('/',adminAuth,SectionController.listAll);
router.get('/search',SectionController.search);
router.get('/:section_id',adminAuth,SectionController.view);
router.post('/',adminAuth,SectionValidator.create,SectionController.create);
router.put('/:section_id',adminAuth,SectionValidator.update,SectionController.update);
router.delete('/:section_id',adminAuth,SectionController.destroy);

module.exports = router;