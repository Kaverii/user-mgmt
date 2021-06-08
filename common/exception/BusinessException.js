/**
 * Business exception class to wrap custom business logic errors
 */
class BusinessException extends Error {
  /**
   * Constructor method
   * @param {string} message - error message
   * @param {string} errorCode - error code
   * @param {number} statusCode - status code
   */
  constructor(message, errorCode, statusCode) {
    super();
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }

  /**
   * To String method to print the object
   * @returns String
   */
  toString() {
    let message = '';
    if (this.errorCode) message += `Error Code ${this.errorCode}`;
    if (this.message) message += `Error Message: ${this.message} `;
    if (this.statusCode) message += `Status Code: ${this.statusCode}`;
    return message;
  }
}
module.exports = BusinessException;
