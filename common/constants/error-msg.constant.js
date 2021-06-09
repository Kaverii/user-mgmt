/**
 * Error Message Constants
 */
const ERROR_MSGS = {
  INVALID_USER: 'Invalid User',

  // ID Error Messages
  INVALID_ID: 'Invalid id!',
  ID_REQUIRED: 'Id is required!',
  ID_EMPTY: 'Id is empty!',

  // Emailid Error Messages
  INVALID_EMAIL_ID: 'Email id is invalid!',
  EMAIL_ID_REQUIRED: 'Email id is required!',
  EMAIL_ID_EMPTY: 'Email id cannot be empty!',

  // Username Error Messages
  INVALID_USERNAME: 'Username is invalid!',
  USERNAME_REQUIRED: 'Username is required!',
  USERNAME_EMPTY: 'Username cannot be empty!',
  USERNAME_LENGTH_NOT_SATISFIED: 'Username should be from 3 to 30 characters.',
  USERNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS: 'Username can only contain alphabets and numbers. Special charecters are not allowed.',

  // Full Name Error Messages
  INVALID_FULL_NAME: 'Fullname is invalid!',
  FULL_NAME_REQUIRED: 'Fullname is required!',
  FULL_NAME_EMPTY: 'Fullname cannot be empty!',

  // Password Error Messages
  INVALID_PASSWORD: 'Password is invalid!',
  PASSWORD_REQUIRED: 'Password is required!',
  PASSWORD_EMPTY: 'Password cannot be empty!',
  PASSWORD_PATTERN_NOT_MATCHED: 'Password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
};

module.exports = ERROR_MSGS;
