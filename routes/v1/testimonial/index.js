const { Router }= require('express');
const router = Router();
const TestimonialController=require('../../../controllers/testimonial/testimonial.controller');
const  TestimonialValidator=require('../../../middlewares/validation/testimonialValidation');

router.get('/',TestimonialController.listAll);
router.get('/search',TestimonialController.search);
router.get('/:testimonial_id',TestimonialController.view);

router.post('/',TestimonialValidator.create,TestimonialController.create);
router.put('/:testimonial_id',TestimonialValidator.update,TestimonialController.update);
router.delete('/:testimonial_id',TestimonialController.destroy);

module.exports = router;