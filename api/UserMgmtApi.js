const logger = require('../utils/Logger');
const LOGGER_CODES = require('../constants/LoggerCodeConstants');
const STATUS_CODES = require('../constants/StatusCodeConstants');
const UserMgmtService = require('../services/UserMgmtService');

/**
 * API to get user by emailid
 * @param {object} event - Request with pathParameters emailid
 * @returns {object} - Response object
 */
const getUser = async (event = {}) => {
  const METHOD_NAME = 'UserMgmtAPI::getUser';
  logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);
  let response = {};
  try {
    const {
      emailId,
    } = event.pathParameters;
    const result = await UserMgmtService.getUser(emailId);
    response = {
      statusCode: STATUS_CODES.CREATED,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  } catch (error) {
    logger.error(`${METHOD_NAME} - ${error}`);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  }
};

/**
 * API to register user
 * @param {object} event - API Event Object - Request
 * @returns {object} response
 */
const registerUser = async (event = {}) => {
  const METHOD_NAME = 'UserMgmtAPI::registerUser';
  logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

  let response = {};
  try {
    const user = JSON.parse(event.body);
    const result = await UserMgmtService.registerUser(user);
    response = {
      statusCode: STATUS_CODES.CREATED,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  } catch (error) {
    logger.error(`${METHOD_NAME} - ${error}`);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  }
};

/**
 * API to update user details by emailid
 * @param {*} event
 * @returns
 */
const updateUser = async (event = {}) => {
  const METHOD_NAME = 'UserMgmtAPI::updateUser';
  logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

  let response = {};
  try {
    const user = JSON.parse(event.body);
    const {
      emailId,
    } = event.pathParameters;
    user.emailId = emailId;
    const result = await UserMgmtService.updateUser(user);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  } catch (error) {
    logger.error(`${METHOD_NAME} - ${error}`);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  }
};

/**
 * Method to delete user api
 * @param {object} event
 * @returns {object} Response
 */
const deleteUser = async (event = {}) => {
  const METHOD_NAME = 'UserMgmtAPI::deleteUser';
  logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

  let response = {};
  try {
    const {
      emailId,
    } = event.pathParameters;
    await UserMgmtService.deleteUser(emailId);
    response = {
      statusCode: STATUS_CODES.UPDATED,
      body: JSON.stringify({
        success: true,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  } catch (error) {
    logger.error(`${METHOD_NAME} - ${error}`);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
        input: event,
      }),
    };
    logger.info(LOGGER_CODES.LOG003, METHOD_NAME, response);
    logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return response;
  }
};

module.exports = {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
};
