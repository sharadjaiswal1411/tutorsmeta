 const {Router} = require('express');
 const router = Router();
 const BoardController = require('../../../controllers/board/board.controller');
 const BoardValidator = require('../../../middlewares/validation/boardValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,BoardController.listAll);
 router.get('/search',BoardController.search);
router.get('/:board_id',adminAuth,BoardController.view);
router.post('/',adminAuth,BoardValidator.create,BoardController.create);
router.put('/:board_id',adminAuth,BoardValidator.update,BoardController.update);
router.delete('/:board_id',adminAuth,BoardController.destroy);


module.exports = router;