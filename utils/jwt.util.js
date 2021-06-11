const jwt = require('jsonwebtoken');

const { JWT_EXPIRATION_TIME } = require('../common/constants/common.constant');
const ERROR_CODES = require('../common/constants/error-code.constant');
const BusinessException = require('../common/exception/business.exception');
const SystemException = require('../common/exception/system.exception');

const format = require('./format.util');
const logger = require('./logger.util');

const { JWT_SECRET } = process.env;

class JwtUtils {
  /**
   * Method to sign token by id
   * @param {string} id
   * @returns auth token
   */
  static signToken(id) {
    logger.trace('Enter Jwt Util:signToken Id: %s', id);
    let token = null;
    try {
      token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION_TIME,
      });
    } catch (error) {
      throw new SystemException(
        'UM5003E',
        format(ERROR_CODES.UM5003E, error),
      );
    }
    logger.trace('Exit Jwt Util:signToken Token: %s', token);
    return token;
  }

  /**
   * Method to check the verification token
   * @param {sting} token - String
   * @returns Promise<object> - throws exception if not valid token
   */
  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      logger.trace('Enter Jwt Util:verifyToken %s', token);
      if (!token) {
        reject(new BusinessException('UM4031E', ERROR_CODES.UM4031E));
      }
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(new BusinessException('UM4031E', ERROR_CODES.UM4031E + err.message));
        } else {
          logger.trace('Exit Jwt Util:verifyToken Result %o', decoded);
          resolve(decoded);
        }
      });
    });
  }
}

module.exports = JwtUtils;
