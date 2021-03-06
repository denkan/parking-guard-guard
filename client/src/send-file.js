const request = require('request');
const fs = require('fs');
const config = require('../../_shared/config');

const C = config.getConfig({
    SERVER_UPLOAD_URL: process.env.SERVER_UPLOAD_URL || 'http://localhost:3000/upload',
});

const sendFile = (filePath) => {
    if(!fs.existsSync(filePath)){
        return console.log('[SENDFILE] File not found:', filePath);
    }

    const req = request.post(C.SERVER_UPLOAD_URL, function (err, resp, body) {
        if (err) {
            console.log('[SENDFILE POST] Error:', err);
        } else {
            console.log('[SENDFILE POST] URL: ' + body);
        }
    });
    const form = req.form();
    form.append('file', fs.createReadStream(filePath));
}

module.exports = {
    sendFile,
}