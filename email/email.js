const mail = require("nodemailer");
const { renderFile } = require("ejs");
const { smtpCredentials } = require("../constant/common");

var transporter = mail.createTransport({
    host: smtpCredentials.SMTP_HOST,
    port: 465,
    secure: true, // use SSL
    auth: {
        user: smtpCredentials.SMTP_USER,
        pass: smtpCredentials.SMTP_PASS
    }
});

function sendMail(email, sendData,subject,textTemplate) {
    try {
        renderFile(appRoot + "/public/mailTemplates/"+textTemplate, sendData, function (err, dataTemplate) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: smtpCredentials.SMTP_EMAIL,
                    to: email,
                    subject,
                    html: dataTemplate
                };
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                        return false;
                    } else {
                        console.log(info);
                        return true;
                    }
                });
            }
        })

    }catch (error) {
        console.log('---Email Error--',error);
        return false;
    }
}

module.exports = {
    sendMail
};
