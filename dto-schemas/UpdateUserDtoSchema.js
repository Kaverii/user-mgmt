const Joi = require('joi');
const ErrorMsgConstants = require('../constants/ErrorMsgConstants');
const ValidationUtils = require('../utils/ValidationUtils');

const {
  USERNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
} = require('../constants/CommonConstants');

/**
 * Validation Error message mapping constants
 */
const ERROR_MSG_MAPPING = {
  /**
   * Emailid error message mapping constants
   */
  EMAIL: {
    'any.required': ErrorMsgConstants.EMAIL_ID_REQUIRED,
    'string.base': ErrorMsgConstants.INVALID_EMAIL_ID,
    'any.empty': ErrorMsgConstants.EMAIL_ID_EMPTY,
    default: ErrorMsgConstants.INVALID_EMAIL_ID,
  },
  /**
   * Username error message mapping constants
   */
  USERNAME: {
    'string.base': ErrorMsgConstants.INVALID_USERNAME,
    'any.empty': ErrorMsgConstants.USERNAME_EMPTY,
    'string.min': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
    'string.max': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
    'string.alphanum': ErrorMsgConstants.USERNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS,
    default: ErrorMsgConstants.INVALID_USERNAME,
  },
  /**
   * Full Name error message mapping constants
   */
  FULL_NAME: {
    'string.base': ErrorMsgConstants.INVALID_FULL_NAME,
    'any.empty': ErrorMsgConstants.FULL_NAME_EMPTY,
    default: ErrorMsgConstants.INVALID_FULL_NAME,
  },
  /**
   * Password error message mapping constant
   */
  PASSWORD: {
    'string.base': ErrorMsgConstants.INVALID_PASSWORD,
    'any.empty': ErrorMsgConstants.PASSWORD_EMPTY,
    'object.pattern.match': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
    'string.pattern.base': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
    default: ErrorMsgConstants.INVALID_PASSWORD,
  },
};

/**
 * Update User Schema to validate given user object
 */
const UpdateUserDTOSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.EMAIL),
    ),
  [USER_FIELDS.USERNAME]: Joi.string()
    .alphanum()
    .min(USERNAME_VALIDATION.MIN_LENGTH)
    .max(USERNAME_VALIDATION.MAX_LENGTH)
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.USERNAME),
    ),
  [USER_FIELDS.FULL_NAME]: Joi.string()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.FULL_NAME),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .pattern(new RegExp(PASSWORD_PATTERN))
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.PASSWORD),
    ),
});

module.exports = UpdateUserDTOSchema;
