const { Router }= require('express');
const router = Router();
const ScheduleController=require('../../../controllers/schedule/schedule.controller');
const  ScheduleValidator=require('../../../middlewares/validation/scheduleValidation');
const {userAuth, adminAuth} = require('../../../middlewares/auth-user');

router.get('/',adminAuth,ScheduleController.listAll);
router.get('/search',ScheduleController.search);
router.get('/:schedule_id',adminAuth,ScheduleController.view);
router.post('/',adminAuth,ScheduleValidator.create,ScheduleController.create);
router.put('/:schedule_id',adminAuth,ScheduleValidator.update,ScheduleController.update);
router.delete('/:schedule_id',adminAuth,ScheduleController.destroy);

module.exports = router;