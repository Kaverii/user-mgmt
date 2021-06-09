const STATUS_CODES = require('../constants/status-code.constant');

/**
 * System exception class to wrap custom business logic errors
 */
class SystemException extends Error {
  /**
   * Constructor method
   * @param {string} errorCode - error code
   * @param {string} message - error message
   * @param {string} statusCode - status code
   */
  constructor(message, errorCode, statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR) {
    super();
    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = statusCode;
  }

  /**
   * To String method to print the object
   * @returns String
   */
  toString() {
    let message = 'Error ';
    if (this.errorCode) message += `Code ${this.errorCode}`;
    if (this.message) message += `Message: ${this.message} `;
    message += `Status Code: ${this.statusCode}`;
    return message;
  }
}
module.exports = SystemException;
