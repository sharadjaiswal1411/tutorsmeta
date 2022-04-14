const { Router }= require('express');
const router = Router();
const ExperienceController=require('../../../controllers/experience/experience.controller');
const  ExperienceValidator=require('../../../middlewares/validation/experienceValidation');

router.get('/',ExperienceController.listAll);
router.get('/search',ExperienceController.search);
router.get('/:experience_id',ExperienceController.view);

router.post('/',ExperienceValidator.create,ExperienceController.create);
router.put('/:experience_id',ExperienceValidator.update,ExperienceController.update);
router.delete('/:experience_id',ExperienceController.destroy);

module.exports = router;