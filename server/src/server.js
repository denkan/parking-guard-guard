const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const randomstring = require("randomstring");
const dateformat = require('dateformat');

const app = express();

const CONFIG = {
    PORT: process.env.PORT || 3000,
    UPLOAD_DIR: process.env.UPLOAD_DIR || path.resolve(__dirname, 'uploads')
};



const start = () => {

    app.use(fileUpload());

    app.post('/upload', function (req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        Object.keys(req.files).forEach(key => {
            const uploadedFile = req.files[key];
            const fileName = dateformat('yymmdd-HHMMss') + randomstring(7) + '.jpg';
            const filePath = path.resolve(CONFIG.UPLOAD_DIR, fileName);

            uploadedFile.mv(filePath, function (err) {
                if (err)
                    return res.status(500).send(err);

                res.send({
                    status: 'OK',
                    fileName: fileName
                });
            });
        })
    });


    app.listen(3000, () => {
        console.log('========= PARKING GUARD GUARD SERVER ==========');
        console.log('Web server listening on port', CONFIG.PORT);
        console.log('Upload dir:', CONFIG.UPLOAD_DIR);
        console.log('===============================================');
    });

}


module.exports = {
    start
}