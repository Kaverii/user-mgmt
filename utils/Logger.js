const pino = require('pino');

const LOG_LEVEL = process.env.LOG_LEVEL || 'trace';

const Logger = pino({
  level: LOG_LEVEL,
  prettyPrint: { colorize: true },
});

module.exports = Logger;
