const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const randomstring = require("randomstring");
const dateformat = require('dateformat');
const config = require('../../_shared/config');
const utils = require('../../_shared/utils');

const app = express();

const C = config.getConfig({
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_UPLOAD_DIR: process.env.UPLOAD_DIR || path.resolve(__dirname, '../uploads')
});


const start = () => {

    app.use(fileUpload());

    app.post('/upload', function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        console.log('[SERVER] Uploaded files:', req.files);
        Object.keys(req.files).forEach(key => {
            const uploadedFile = req.files[key];
            const fileName = dateformat('yymmdd-HHMMss') + '-' + randomstring.generate(7) + '.jpg';
            const filePath = path.resolve(utils.fullPath(C.SERVER_UPLOAD_DIR), fileName);

            console.log('[SERVER] File:', uploadedFile);
            uploadedFile.mv(filePath, function (err) {
                if (err)
                    return res.status(500).send(err);

                res.send({
                    status: 'OK',
                    fileName: fileName,
                });
            });
        })
    });


    app.listen(C.SERVER_PORT, () => {
        console.log('========= PARKING GUARD GUARD SERVER ==========');
        console.log('Server started with following config:');
        console.log(C);
        console.log('===============================================');
    });

}


module.exports = {
    start
}