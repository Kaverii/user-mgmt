const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const BusinessException = require('../common/exception/business.exception');
const ERROR_CODES = require('../common/constants/error-code.constant');
const logger = require('../utils/logger.util');

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// eslint-disable-next-line consistent-return
const userAuthGuard = (event, context, callback) => {
  try {
    const token = event.authorizationToken && event.authorizationToken.substring(7);
    logger.trace('Entry user-auth::userAuthGuard Method %o', token);

    if (!token) {
      throw new BusinessException('UM4004E', ERROR_CODES.UM4031E);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new BusinessException('UM4004E', ERROR_CODES.UM4031E);
      }
      return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
    });
  } catch (error) {
    logger.error('In user-auth::userAuthGuard, %o', error);
    return callback(null, 'Unauthorized');
  }
};
module.exports = {
  userAuthGuard,
};
