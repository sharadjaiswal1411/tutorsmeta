const { Router }= require('express');
const router = Router();
const ProgramController=require('../../../controllers/program/program.controller');
const  ProgramValidator=require('../../../middlewares/validation/programValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,ProgramController.listAll);
 router.get('/search',ProgramController.search);
router.get('/:program_id',adminAuth,ProgramController.view);
router.post('/',adminAuth,ProgramValidator.create,ProgramController.create);
router.put('/:program_id',adminAuth,ProgramValidator.update,ProgramController.update);
router.delete('/:program_id',adminAuth,ProgramController.destroy);


module.exports = router;