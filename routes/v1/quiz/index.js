const { Router }= require('express');
const router = Router();
const QuizController=require('../../../controllers/quiz/quiz.controller');
const  QuizValidator=require('../../../middlewares/validation/quizValidation');

router.get('/',QuizController.listAll);
router.get('/search',QuizController.search);
router.get('/:quiz_id',QuizController.view);
router.post('/',QuizValidator.create,QuizController.create);
router.put('/:quiz_id',QuizValidator.update,QuizController.update);
router.delete('/:quiz_id',QuizController.destroy);

module.exports = router;