const { Router }= require('express');
const router = Router();
const SkillController=require('../../../controllers/skill/skill.controller');
const SkillValidator=require('../../../middlewares/validation/cityValidation');
const {userAuth,adminAuth}  = require('../../../middlewares/auth-user');

router.get('/',adminAuth,SkillController.listAll);
router.get('/search',SkillController.search);
router.get('/:skill_id',adminAuth,SkillController.view);
router.post('/',adminAuth,SkillValidator.create,SkillController.create);
router.put('/:skill_id',adminAuth,SkillValidator.update,SkillController.update);
router.delete('/:skill_id',adminAuth,SkillController.destroy);

module.exports = router;