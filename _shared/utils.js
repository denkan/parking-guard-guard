const path = require('path');

const fullPath = (relOrAbsPath) => {
    return path.isAbsolute(relOrAbsPath)
        ? relOrAbsPath
        : path.resolve('../', relOrAbsPath) // relative to project root
}

module.exports = {
    fullPath,
}