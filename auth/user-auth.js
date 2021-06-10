const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const BusinessException = require('../common/exception/business.exception');
const ERROR_CODES = require('../common/constants/error-code.constant');
const { AUTH_CONSTANTS } = require('../common/constants/common.constant');
const logger = require('../utils/logger.util');

const { JWT_SECRET } = process.env;

/**
 * Helper function to generate policy on response
 * @param {string} principalId
 * @param {string} effect
 * @param {string} resource
 * @returns {string} auth response
 */
const generatePolicy = (principalId, effect, resource) => {
  logger.trace('Entry user-auth::generatePolicy Method with args %s %s %s', principalId, effect, resource);
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
  logger.debug('In user-auth::generatePolicy Method, return value %o', authResponse);
  logger.trace('Exit user-auth::generatePolicy Method with result %o', authResponse);
  return authResponse;
};

/**
 * Method to check the verification token
 * @param {sting} token - String
 * @returns Promise<object> - throws exception if not valid token
 */
const verifyToken = (token) => new Promise((resolve, reject) => {
  logger.trace('Entry user-auth::verifyToken Method %s', token);
  if (!token) {
    reject(new BusinessException('UM4004E', ERROR_CODES.UM4031E));
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      reject(new BusinessException('UM4004E', ERROR_CODES.UM4031E + err.message));
    } else {
      logger.debug('In user-auth::verifyToken Method, return value %o', decoded);
      logger.trace('Exit user-auth::verifyToken Method with result %o', decoded);
      resolve(decoded);
    }
  });
});

/**
 * Method to check if the user is authenticated
 * @param {object} event
 * @returns response
 */
const userAuth = async (event) => {
  try {
    const token = event.authorizationToken && event.authorizationToken.substring(7);
    logger.trace('Entry user-auth::userAuth Method %s', token);

    const decoded = await verifyToken(token);
    const response = generatePolicy(decoded.id,
      AUTH_CONSTANTS.POLICY.STATEMENT_EFFECT.ALLOW,
      event.methodArn);

    logger.debug('In user-auth::userAuth, Response: %o', response);
    logger.trace('Exit user-auth::userAuth Method response %o', response);
    return response;
  } catch (error) {
    logger.error('In user-auth::userAuth, %o', error);
    const response = generatePolicy(null,
      AUTH_CONSTANTS.POLICY.STATEMENT_EFFECT.DENY,
      event.methodArn);
    return response;
  }
};

module.exports = {
  userAuth,
};
