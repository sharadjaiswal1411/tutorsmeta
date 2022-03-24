const { Router } = require('express');
const router = Router();

const serviceRouter = require('./service');
const courseRouter = require('./course');
const categoryRouter = require('./category');

router.use('/service', serviceRouter);
router.use('/course', courseRouter);
router.use('/category', categoryRouter);
module.exports = router;
