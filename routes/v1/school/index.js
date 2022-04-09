
const {Router} = require('express');
 const router = Router();
 const SchoolController = require('../../../controllers/school/school.controller');
 const SchoolValidator = require('../../../middlewares/validation/schoolValidation');
 const {userAuth, adminAuth} = require('../../../middlewares/auth-user');



 router.get('/',adminAuth,SchoolController.listAll);
 router.get('/search',SchoolController.search);
router.get('/:school_id',adminAuth,SchoolController.view);
router.post('/',adminAuth,SchoolValidator.create,SchoolController.create);
router.put('/:school_id',adminAuth,SchoolValidator.update,SchoolController.update);
router.delete('/:school_id',adminAuth,SchoolController.destroy);


module.exports = router;