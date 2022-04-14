const { Router }= require('express');
const router = Router();
const GalleryimageController=require('../../../controllers/galleryimage/galleryimage.controller');
const  GalleryimageValidator=require('../../../middlewares/validation/galleryimageValidation');

router.get('/',GalleryimageController.listAll);
router.get('/search',GalleryimageController.search);
router.get('/:galleryimage_id',GalleryimageController.view);

router.post('/',GalleryimageValidator.create,GalleryimageController.create);
router.put('/:galleryimage_id',GalleryimageValidator.update,GalleryimageController.update);
router.delete('/:galleryimage_id',GalleryimageController.destroy);

module.exports = router;