 const ADMIN = {
    email: '',
    otpSubject: 'The PHED (Are You In) OTP'
};
const DEFAULT_DISTANCE = 20;

const smtpCredentials = {
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_EMAIL: process.env.SMTP_EMAIL
};


const s3bucket = {
    Bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESSKEYID,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    region: process.env.AWS_REGION
}

const ph_code= '+1';
const zone = 'Asia/Kolkata'
const email_validation_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
const password_validation_regex = /^(?=.{8,})(?=.*[A-Z])(?=.*\d).*$/
const numbers_validation_regex= /^[0-9]+$/;
const settings= {
    PER_PAGE_RECORDS: 10,
    PAGE_NO: 1,
    IS_EXPORT: 0,
    ORDER_BY: 'id-DESC',
    RETURN_DB_DATE_TIME_FORMAT: '%b %d, %Y %l:%i %p',
    RETURN_DB_DATE_FORMAT: '%D %M, %Y',
    FULL_DATE_FORMAT: '%D %M %Y',
    DEFAULT_VALUE: 'N/A',
    expiresIn: '28d'
}

const PASSWORD= {
    MIN: 6,
    MAX: 20,
    SALT_LENGTH: 10
}

module.exports = {
    ADMIN,
    DEFAULT_DISTANCE,
    smtpCredentials,
    s3bucket,
    ph_code,
    email_validation_regex,
    numbers_validation_regex,
    password_validation_regex,
    settings,
    PASSWORD,
    zone
};