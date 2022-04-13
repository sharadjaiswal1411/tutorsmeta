
const { Router } = require('express');
const router = Router();



const userRouter = require('./user');
const authRouter = require('./auth');
const roleRouter = require('./role');
const categoryRouter = require('./category');
const subcategoryRouter = require('./subcategory');
const classRouter = require('./class');
const boardRouter = require('./board');
const branchRouter = require('./branch');
const cityRouter = require('./city');
const stateRouter = require('./state');
const event_registrationRouter = require('./event_registration');
const company_typeRouter = require('./company_type');
const faqRouter = require('./faq');
const otpRouter = require('./otp');
const quizRouter = require('./quiz');
const programRouter = require('./program');
const skillRouter = require('./skill');
const questionRouter = require('./question');
const internshipRouter = require('./internship');
const personRouter = require('./person');
const eventRouter = require('./event');
const serviceRouter = require('./service');
const enquiryRouter = require('./enquiry');
const countryRouter = require('./country');
const companyRouter = require('./company');
const addressRouter = require('./address');
const studentRouter = require('./student');
const studentAddressRouter = require('./studentAddress');
const collegeRouter = require('./college');
const curriculumRouter = require('./curriculum');
const courseRouter = require('./course');
const benefitRouter = require('./benefit');
const scheduleRouter = require('./schedule');
const instructorRouter = require('./instructor');
const sectionRouter = require('./section');
const fileRouter = require('./file');
const subjectRouter = require('./subject');
const testimonialRouter = require('./testimonial');
const schoolRouter = require('./school');
const membershipRouter = require('./membership');

const teacherRouter = require('./teacher');
const languageRouter = require('./language');


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/role', roleRouter);
router.use('/enquiry', enquiryRouter);
router.use('/city', cityRouter);
router.use('/state', stateRouter);
router.use('/otp', otpRouter);
router.use('/country', countryRouter);
router.use('/company_type', company_typeRouter);
router.use('/faq', faqRouter);
router.use('/service', serviceRouter);
router.use('/quiz', quizRouter);
router.use('/question', questionRouter);
router.use('/program', programRouter);
router.use('/skill', skillRouter);
router.use('/internship', internshipRouter);
router.use('/event_registration', event_registrationRouter);
router.use('/event', eventRouter);
router.use('/person', personRouter);
router.use('/company', companyRouter);
router.use('/address', addressRouter);
router.use('/curriculum', curriculumRouter);
router.use('/student', studentRouter);
router.use('/studentAddress', studentAddressRouter);
router.use('/college', collegeRouter);
router.use('/benefit', benefitRouter);
router.use('/course', courseRouter);
router.use('/section', sectionRouter);
router.use('/schedule', scheduleRouter);
router.use('/category', categoryRouter);
router.use('/subcategory', subcategoryRouter);
router.use('/class', classRouter);
router.use('/instructor', instructorRouter);
router.use('/branch', branchRouter);
router.use('/file', fileRouter);
router.use('/subject', subjectRouter);
router.use('/testimonial', testimonialRouter);
router.use('/board', boardRouter);
router.use('/school', schoolRouter);
router.use('/membership', membershipRouter);
router.use('/language', languageRouter);
router.use('/teacher', teacherRouter);


module.exports = router;
