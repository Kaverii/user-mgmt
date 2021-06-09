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
const JWT_EXPIRATION_TIME = 2 * 24 * 60 * 60; // expires in 2 days

module.exports = {
  USERNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
  PASSWORD_SALT_ROUNDS,
  JWT_EXPIRATION_TIME,
};
