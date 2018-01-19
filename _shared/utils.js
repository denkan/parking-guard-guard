const path = require('path');
const config = require('./config');

const C = config.getConfig({
    SERVER_UPLOAD_URL: process.env.SERVER_UPLOAD_URL || 'http://localhost:3000/upload',
});


/**
 * Always get full/absolute path
 * @param {string} relOrAbsPath 
 */
const fullPath = (relOrAbsPath) => {
    return path.isAbsolute(relOrAbsPath)
        ? relOrAbsPath
        : path.resolve('../', relOrAbsPath) // relative to project root
}

/**
 * Replace placeholders with param
 * E.g: 
 * paramString("This is my %TESTPARAM%, nice!", { TESTPARAM: 'working example' })
 * = "This is my working example, nice!"
 * @param {string} str 
 * @param {object} params 
 * @param {string} prefixChar 
 * @param {string} suffixChar 
 */
const paramString = (str, params, prefixChar, suffixChar) => {
    prefixChar = prefixChar || '%';
    suffixChar = suffixChar || '%';

    if(!str || !params) return str;

    Object.keys(params).forEach(p => {
        const placeholderVar = prefixChar + p + suffixChar;
        const re = new RegExp(placeholderVar, 'gi');
        str = str.replace(re, params[p]);
    });

    return str;
}

/**
 * Get uploaded image url
 * @param {string} fileName 
 */
const imageUrl = (fileName) => {
    return C.SERVER_UPLOAD_URL + 's/' + fileName;
}


module.exports = {
    fullPath,
    paramString,
    imageUrl,
}