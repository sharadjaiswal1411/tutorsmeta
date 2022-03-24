const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const from = process.env.SMS_FROM;

const clientTwilio = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

function sendMessage(message, mobile) {
    return new Promise(function (resolve, reject) {

        clientTwilio.messages.create({
            body: message,
            to: mobile, // Text this number
            from: from // From a valid Twilio number
        }, function (err, message) {
            if (err) {
                console.log("twilio message error...",err);
                resolve(false);
            }
            else {
                console.log(message.sid);
                resolve(true);
            }
        });

    });
}

module.exports = {
    sendMessage
}