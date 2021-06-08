const STATUS_CODES = require('./StatusCodeConstants');

/**
 * Constants for error code config
 */
const ERROR_CODE_CONFIG = {
  ERR001: {
    TYPE: 'ERR001: DTO Validation Failed',
    STATUS_CODE: STATUS_CODES.BAD_REQUEST,
  },
  ERR002: {
    TYPE: 'ERR002: DB Query Execution Error',
  },
  ERR003: {
    TYPE: 'ERR003: Exception during password hasing',
    STATUS_CODE: STATUS_CODES.INTERNAL_SERVER_ERROR,
  },
  ERR004: {
    TYPE: 'ERR004: Record Not Present in DB',
    STATUS_CODE: STATUS_CODES.BAD_REQUEST,
  },
};

module.exports = ERROR_CODE_CONFIG;
