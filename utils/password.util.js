const bcrypt = require('bcryptjs');

const ERROR_CODE_CONFIG = require('../common/constants/error-code.constant');
const { PASSWORD_SALT_ROUNDS } = require('../common/constants/common.constant');
const SystemException = require('../common/exception/system.exception');

const logger = require('./logger.util');
const format = require('./format.util');

/**
 * Password Utils using bcrypt.
 * bcrypt npm doc: https://www.npmjs.com/package/bcryptjs
 */
class PasswordUtils {
  /**
   * Method to hash password
   * @param {string} plainPassword - plain password which is to be hashed
   * @returns {Promise<object>} - Promise resolves hashValue or rejects SystemException
   */
  static hashPassword(plainPassword) {
    logger.trace('Entered PasswordUtils::hashPassword Method Execution %s', plainPassword);

    return new Promise((resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
        const hash = bcrypt.hashSync(plainPassword, salt);
        logger.trace('Exit PasswordUtils::hashPassword Method Execution with Result %o', hash);
        resolve(hash);
      } catch (err) {
        logger.error('In PasswordUtils::hashPassword, Password hasing: %o', err);
        reject(new SystemException(
          'UM5002E',
          format(ERROR_CODE_CONFIG.UM5001E, err),
        ));
      }
    });
  }

  /**
   * Method to compare password
   * @param {string} plainPassword - plain password which is to be hashed
   * @param {string} hashPassword - Hash value of the password
   * @returns {Promise<boolean>} - Promise resolves true | false or rejects SystemException
   */
  static compare(plainPassword, hashPassword) {
    logger.trace('Entered PasswordUtils::compare Method Execution with password: %s hashPassword%s', plainPassword, hashPassword);

    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashPassword, (err, result) => {
        if (err) {
          logger.error('In PasswordUtils::compare, password compare error: %o', err);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5001E, err),
          ));
        }
        logger.trace('Exit PasswordUtils::hashPassword Method Execution with Return Value %o', result);
        resolve(result);
      });
    });
  }
}
module.exports = PasswordUtils;
