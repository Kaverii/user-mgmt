/**
 * Username configuration constant
 */
const USERNAME_VALIDATION = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
};

/**
 * Password configration constant
 */
const PASSWORD_PATTERN = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';

/**
 * User fields
 */
const USER_FIELDS = {
  ID: 'id',
  EMAIL_ID: 'emailId',
  USERNAME: 'username',
  FULL_NAME: 'fullName',
  PASSWORD: 'password',
};

/**
 * Password Salt Rounds
 */
const PASSWORD_SALT_ROUNDS = 10;

/**
 * JWT Constants
 */
const JWT_EXPIRATION_TIME = 172800; // Expires in 2 days. Count mentioned in seconds

/**
 * Authorizer constants
 */
const AUTH_CONSTANTS = {
  POLICY: {
    VERSION: '2012-10-17',
    STATEMENT_ACTION: 'execute-api:Invoke',
    STATEMENT_EFFECT: {
      ALLOW: 'Allow',
      DENY: 'Deny',
    },
  },
};

module.exports = {
  USERNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
  PASSWORD_SALT_ROUNDS,
  JWT_EXPIRATION_TIME,
  AUTH_CONSTANTS,
};
