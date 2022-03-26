const { Router }= require('express');
const router = Router();
const QuestionController=require('../../../controllers/question/question.controller');
const  QuestionValidator=require('../../../middlewares/validation/questionValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,QuestionController.listAll);
 router.get('/search',QuestionController.search);
router.get('/:question_id',adminAuth,QuestionController.view);
router.post('/',adminAuth,QuestionValidator.create,QuestionController.create);
router.put('/:question_id',adminAuth,QuestionValidator.update,QuestionController.update);
router.delete('/:question_id',adminAuth,QuestionController.destroy);


module.exports = router;