const nodemailer = require('nodemailer');

const constants = require('../constant/common');

let { smtpCredentials } = constants;

var transporter = nodemailer.createTransport({
    host: smtpCredentials.SMTP_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: smtpCredentials.SMTP_USER,
        pass: smtpCredentials.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (mailOptions) => {
    await transporter.sendMail(mailOptions);
};


module.exports = {
    sendEmail
};
