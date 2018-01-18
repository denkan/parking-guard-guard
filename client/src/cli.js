const run = () => {
    const args = process.argv.slice(2);
    console.log('CLI ARGS: ', args);

    const action = args[0];
    switch(action.toLowerCase()) {
        case '--send':
            return require('./send-file').sendFile(args[1])
    }
}

module.exports = {
    run,
}