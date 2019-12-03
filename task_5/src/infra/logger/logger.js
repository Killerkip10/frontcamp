const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

module.exports = () => ({
    log: (...rest) => logger.info(...rest),
    error: (...rest) => logger.error(...rest),
});