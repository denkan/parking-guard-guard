const path = require('path');
const fs = require('fs');

const configFileName = 'config.json';
const configFilePath = path.resolve('../',configFileName); 

const getConfig = (defaultValues) => {
    if (!fs.existsSync(configFilePath)) {
        console.warn('[CONFIG] No config file found at', configFilePath);
        return defaultValues;
    }

    const configFromFile = JSON.parse(fs.readFileSync(configFilePath));
    const config = Object.assign({}, defaultValues, configFromFile);

    return config;
}

module.exports = {
    getConfig,
}