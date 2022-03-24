const { Router }= require('express');
const router = Router();
const RoleController=require('../../../controllers/role/role.controller');
const  RoleValidator=require('../../../middlewares/validation/roleValidation');

router.get('/',RoleController.listAll);
router.get('/search',RoleController.search);
router.get('/:role_id',RoleController.view);
router.post('/',RoleValidator.create,RoleController.create);
router.put('/:role_id',RoleValidator.update,RoleController.update);
router.delete('/:role_id',RoleController.destroy);

module.exports = router;