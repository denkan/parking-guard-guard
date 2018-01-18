const request = require('request');
const fs = require('fs');

const CONFIG = {
    UPLOAD_URL: process.env.UPLOAD_URL || 'http://localhost:3000/upload',
}

const sendFile = (filePath) => {
    if(!fs.existsSync(filePath)){
        return console.log('[SENDFILE] File not found:', filePath);
    }

    const req = request.post(CONFIG.UPLOAD_URL, function (err, resp, body) {
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