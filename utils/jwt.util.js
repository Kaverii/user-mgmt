const jwt = require('jsonwebtoken');
const { JWT_EXPIRATION_TIME } = require('../common/constants/common.constant');

class JwtHelper {
  /**
   * Method to sign token by id
   * @param {string} id
   * @returns auth token
   */
  static signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRATION_TIME,
    });
  }
}

module.exports = JwtHelper;
