const { AUTH_CONSTANTS } = require('../common/constants/common.constant');
const AuthUtils = require('../utils/auth.util');
const JwtUtils = require('../utils/jwt.util');
const logger = require('../utils/logger.util');

/**
 * Method to check if the user is authenticated
 * @param {object} event
 * @returns response
 */
const userAuth = async (event) => {
  try {
    const token = event.authorizationToken && event.authorizationToken.substring(7);
    logger.trace('Enter user-auth:userAuth  Token: %s', token);

    const decoded = await JwtUtils.verifyToken(token);
    const response = AuthUtils.generatePolicy(decoded.id,
      AUTH_CONSTANTS.POLICY.STATEMENT_EFFECT.ALLOW,
      event.methodArn);

    logger.trace('Exit user-auth:userAuth Method response %o', response);
    return response;
  } catch (error) {
    logger.error('In user-auth:userAuth, %o', error);
    const response = AuthUtils.generatePolicy(null,
      AUTH_CONSTANTS.POLICY.STATEMENT_EFFECT.DENY,
      event.methodArn);
    return response;
  }
};

module.exports = {
  userAuth,
};
