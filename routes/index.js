const { Router } = require('express');

const routesV1 = require('./v1');
const routesFront = require('./frontend');

const router = Router();

router.use('/v1', routesV1);
router.use('/frontend', routesFront);



module.exports = router;
