const twilio = require('twilio');
const config = require('../../../_shared/config');

const C = config.getConfig({
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    SMS_MESSAGE: process.env.SMS_MESSAGE || '',
    SMS_RECEIVER: process.env.SMS_RECEIVER || '',
    SMS_SENDER: process.env.SMS_SENDER || '',
});

const client = new twilio(C.TWILIO_ACCOUNT_SID, C.TWILIO_AUTH_TOKEN);


const send = (to, from, body) => {
    const promise = client.messages.create({ 
        to, 
        from, 
        body, 
    })
    promise.then(resp => console.log('[SEND_SMS_TWILIO] Message sent:', resp));
    promise.catch(err => console.error('[SEND_SMS_TWILIO] Message failed:', err));
    return promise;
}

const sendWarning = () => send(
    C.SMS_RECEIVER, 
    C.SMS_SENDER, 
    C.SMS_MESSAGE,
);

module.exports = {
    send,
    sendWarning,
}