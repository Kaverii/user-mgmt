const pino = require('pino');

const LOG_LEVEL = process.env.LOG_LEVEL || 'trace';

/**
 * Logger Configuration
 */
const logger = pino({
  level: LOG_LEVEL,
  prettyPrint: {
    colorize: true,
  },
});

module.exports = logger;
