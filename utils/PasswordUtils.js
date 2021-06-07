const bcrypt = require('bcryptjs');
const Logger = require('./Logger');
const ERROR_CODE_CONFIG = require('../constants/ErrorCodeConstants');
const LOGGER_CODES = require('../constants/LoggerCodeConstants');
const SystemException = require('./SystemException');

const SALT_ROUNDS = 10;

/**
 * Password Utils using bcrypt.
 * bcrypt npm doc: https://www.npmjs.com/package/bcrypt
 */
class PasswordUtils {
  /**
   * Method to hash password
   * @param {string} plainPassword - plain password which is to be hashed
   * @returns {Promise<object>} - Promise resolves hashValue or rejects SystemException
   */
  static hashPassword(plainPassword) {
    const METHOD_NAME = 'PasswordUtils::hashPassword';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

    return new Promise((resolve, reject) => {
      try {
        const salt = bcrypt.genSaltSync(SALT_ROUNDS);
        const hash = bcrypt.hashSync(plainPassword, salt);
        resolve(hash);
      } catch (err) {
        Logger.error(LOGGER_CODES.LOG006, METHOD_NAME, err);
        reject(
          new SystemException(
            err.message,
            ERROR_CODE_CONFIG.ERR003.TYPE,
            ERROR_CODE_CONFIG.ERR003.STATUS_CODE,
          ),
        );
      } finally {
        Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
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
    const METHOD_NAME = 'PasswordUtils::compare';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, hashPassword, (err, hash) => {
        if (!err) {
          resolve(hash);
        } else {
          Logger.error(LOGGER_CODES.LOG007, METHOD_NAME, err);
          reject(
            new SystemException(
              err.message,
              ERROR_CODE_CONFIG.ERR003.TYPE,
              ERROR_CODE_CONFIG.ERR003.STATUS_CODE,
            ),
          );
        }
        Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
      });
    });
  }
}
module.exports = PasswordUtils;
