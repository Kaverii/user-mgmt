const STATUS_CODES = require('../constants/status-code.constant');

/**
 * Business exception class to wrap custom business logic errors
 */
class BusinessException extends Error {
  /**
   * Constructor method
   * @param {string} errorCode - error code
   * @param {string} message - error message
   */
  constructor(message, errorCode) {
    super();
    this.errorCode = errorCode;
    this.message = message;
    this.statusCode = STATUS_CODES.BAD_REQUEST;
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
module.exports = BusinessException;
