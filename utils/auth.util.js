const { AUTH_CONSTANTS } = require('../common/constants/common.constant');
const logger = require('./logger.util');

class AuthUtils {
  /**
   * Helper function to generate policy on response
   * @param {string} principalId
   * @param {string} effect
   * @param {string} resource
   * @returns {string} auth response
   */
  static generatePolicy(principalId, effect, resource) {
    logger.trace('Enter user-auth:generatePolicy Util, principalId: %s ,effect: %s, resource: %s', principalId, effect, resource);
    const authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
      authResponse.policyDocument = {
        Version: AUTH_CONSTANTS.POLICY.VERSION,
        Statement: [
          {
            Action: AUTH_CONSTANTS.POLICY.STATEMENT_ACTION,
            Effect: effect,
            Resource: resource,
          },
        ],
      };
    }
    logger.trace('Exit user-auth:generatePolicy Util, Result: %o', authResponse);
    return authResponse;
  }
}
module.exports = AuthUtils;
