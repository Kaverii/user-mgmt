const Joi = require('joi');
const ErrorMsgConstants = require('../common/constants/error-msg.constant');
const ValidationUtils = require('../utils/validation.util');

const {
  USER_FIELDS,
} = require('../common/constants/common.constant');

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
   * Password error message mapping constant
   */
  PASSWORD: {
    'any.required': ErrorMsgConstants.PASSWORD_REQUIRED,
    'string.base': ErrorMsgConstants.INVALID_PASSWORD,
    'any.empty': ErrorMsgConstants.PASSWORD_EMPTY,
    default: ErrorMsgConstants.INVALID_PASSWORD,
  },
};

/**
 * Login User Schema to validate given user object
 */
const LoginUserDTOSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.EMAIL),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.PASSWORD),
    ),
});

module.exports = LoginUserDTOSchema;
