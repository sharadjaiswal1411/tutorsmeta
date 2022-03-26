const { Router }= require('express');
const router = Router();
const InternshipController=require('../../../controllers/internship/internship.controller');
const  InternshipValidator=require('../../../middlewares/validation/internshipValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,InternshipController.listAll);
 router.get('/search',InternshipController.search);
router.get('/:internship_id',adminAuth,InternshipController.view);
router.post('/',adminAuth,InternshipValidator.create,InternshipController.create);
router.put('/:internship_id',adminAuth,InternshipValidator.update,InternshipController.update);
router.delete('/:internship_id',adminAuth,InternshipController.destroy);


module.exports = router;