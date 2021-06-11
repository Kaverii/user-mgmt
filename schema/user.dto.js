const Joi = require('joi');
const ErrorMsgConstants = require('../common/constants/error-msg.constant');
const ValidationUtils = require('../utils/validation.util');

const {
  USERNAME_VALIDATION,
  PASSWORD_PATTERN,
  USER_FIELDS,
} = require('../common/constants/common.constant');

/**
 * Validation Error message mapping constants
 */
const ERROR_MSG_MAPPING = {
  /**
   * Register user dto error message map
   */
  REGISTER_USER: {
    EMAIL: {
      'any.required': ErrorMsgConstants.EMAIL_ID_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_EMAIL_ID,
      'any.empty': ErrorMsgConstants.EMAIL_ID_EMPTY,
      default: ErrorMsgConstants.INVALID_EMAIL_ID,
    },
    USERNAME: {
      'any.required': ErrorMsgConstants.USERNAME_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_USERNAME,
      'any.empty': ErrorMsgConstants.USERNAME_EMPTY,
      'string.min': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
      'string.max': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
      'string.alphanum': ErrorMsgConstants.USERNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS,
      default: ErrorMsgConstants.INVALID_USERNAME,
    },
    FULL_NAME: {
      'any.required': ErrorMsgConstants.FULL_NAME_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_FULL_NAME,
      'any.empty': ErrorMsgConstants.FULL_NAME_EMPTY,
      default: ErrorMsgConstants.INVALID_FULL_NAME,
    },
    PASSWORD: {
      'any.required': ErrorMsgConstants.PASSWORD_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_PASSWORD,
      'any.empty': ErrorMsgConstants.PASSWORD_EMPTY,
      'object.pattern.match': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
      'string.pattern.base': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
      default: ErrorMsgConstants.INVALID_PASSWORD,
    },
  },

  /**
   * Login user dto error message map
   */
  LOGIN_USER: {
    EMAIL: {
      'any.required': ErrorMsgConstants.EMAIL_ID_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_EMAIL_ID,
      'any.empty': ErrorMsgConstants.EMAIL_ID_EMPTY,
      default: ErrorMsgConstants.INVALID_EMAIL_ID,
    },
    PASSWORD: {
      'any.required': ErrorMsgConstants.PASSWORD_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_PASSWORD,
      'any.empty': ErrorMsgConstants.PASSWORD_EMPTY,
      default: ErrorMsgConstants.INVALID_PASSWORD,
    },
  },

  /**
   * Update User Dto error message
   */
  UPDATE_USER: {
    ID: {
      'any.required': ErrorMsgConstants.ID_REQUIRED,
      'string.base': ErrorMsgConstants.INVALID_ID,
      'any.empty': ErrorMsgConstants.ID_EMPTY,
      default: ErrorMsgConstants.INVALID_ID,
    },
    EMAIL: {
      'string.base': ErrorMsgConstants.INVALID_EMAIL_ID,
      'any.empty': ErrorMsgConstants.EMAIL_ID_EMPTY,
      default: ErrorMsgConstants.INVALID_EMAIL_ID,
    },
    USERNAME: {
      'string.base': ErrorMsgConstants.INVALID_USERNAME,
      'any.empty': ErrorMsgConstants.USERNAME_EMPTY,
      'string.min': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
      'string.max': ErrorMsgConstants.USERNAME_LENGTH_NOT_SATISFIED,
      'string.alphanum': ErrorMsgConstants.USERNAME_CANNOT_CONTAIN_SPECIAL_CHARACTERS,
      default: ErrorMsgConstants.INVALID_USERNAME,
    },
    FULL_NAME: {
      'string.base': ErrorMsgConstants.INVALID_FULL_NAME,
      'any.empty': ErrorMsgConstants.FULL_NAME_EMPTY,
      default: ErrorMsgConstants.INVALID_FULL_NAME,
    },
    PASSWORD: {
      'string.base': ErrorMsgConstants.INVALID_PASSWORD,
      'any.empty': ErrorMsgConstants.PASSWORD_EMPTY,
      'object.pattern.match': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
      'string.pattern.base': ErrorMsgConstants.PASSWORD_PATTERN_NOT_MATCHED,
      default: ErrorMsgConstants.INVALID_PASSWORD,
    },
  },

};

/**
 * Register User Schema to validate given user object
 */
const RegisterUserDtoSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
    })
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.EMAIL),
    ),
  [USER_FIELDS.USERNAME]: Joi.string()
    .required()
    .alphanum()
    .min(USERNAME_VALIDATION.MIN_LENGTH)
    .max(USERNAME_VALIDATION.MAX_LENGTH)
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.USERNAME),
    ),
  [USER_FIELDS.FULL_NAME]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.FULL_NAME),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .required()
    .pattern(new RegExp(PASSWORD_PATTERN))
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.REGISTER_USER.PASSWORD),
    ),
});

/**
 * Login User Schema to validate given user object
 */
const LoginUserDtoSchema = Joi.object({
  [USER_FIELDS.EMAIL_ID]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.LOGIN_USER.EMAIL),
    ),
  [USER_FIELDS.PASSWORD]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.LOGIN_USER.PASSWORD),
    ),
});

/**
 * Update User Schema to validate given user object
 */
const UpdateUserDtoSchema = Joi.object({
  [USER_FIELDS.ID]: Joi.string()
    .required()
    .error(
      ValidationUtils.generateErrorValidationFunc(ERROR_MSG_MAPPING.ID),
    ),
  [USER_FIELDS.EMAIL_ID]: Joi.string()
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

module.exports = {
  RegisterUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
};
