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
  EMAIL_ID: 'emailId',
  USERNAME: 'username',
  FULL_NAME: 'fullName',
  PASSWORD: 'password',
};

module.exports = {
  USERNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
};
