const { Router }= require('express');
const router = Router();
const FeatureController=require('../../../controllers/feature/feature.controller');
const  FeatureValidator=require('../../../middlewares/validation/featureValidation');

router.get('/',FeatureController.listAll);
router.get('/search',FeatureController.search);
router.get('/:feature_id',FeatureController.view);

router.post('/',FeatureValidator.create,FeatureController.create);
router.put('/:feature_id',FeatureValidator.update,FeatureController.update);
router.delete('/:feature_id',FeatureController.destroy);

module.exports = router;