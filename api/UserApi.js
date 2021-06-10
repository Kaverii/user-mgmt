const logger = require('../utils/logger.util');
const STATUS_CODES = require('../common/constants/status-code.constant');
const UserService = require('../services/user.service');
let userBean = require('../bean/user.bean');

/**
 * API to get user by id
 * @param {object} event - Request with pathParameters id
 * @returns {object} - Response object
 */
const getUser = async (event = {}) => {
  let response = {};
  try {
    const {
      id,
    } = event.pathParameters;
    logger.trace('Entered UserApi::getUser Method Execution Id: %s Event %o', id, event);
    const result = await UserService.getUser(id);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.debug('In UserApi::getUser, API Response: %o', response);
    logger.trace('Exit UserMgmtAPI::getUser Method Execution');
    return response;
  } catch (error) {
    logger.error('In UserApi::getUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.debug('In UserApi::getUser, API Response: %o', response);
    return response;
  }
};

/**
 * API to register user
 * @param {object} event - API Event Object - Request
 * @returns {object} response
 */
const registerUser = async (event = {}) => {
  let response = {};
  try {
    userBean = JSON.parse(event.body);
    logger.trace('Entered UserApi::registerUser Method Execution %o', userBean);
    const result = await UserService.registerUser(userBean);
    response = {
      statusCode: STATUS_CODES.CREATED,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.debug('In UserApi::registerUser, API Response %o', response);
    logger.trace('Exit UserApi::registerUser Method Execution');
    return response;
  } catch (error) {
    logger.error('In UserApi::registerUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.debug('In UserApi::registerUser, API Response: %o', response);
    return response;
  }
};

/**
 * API to update user details by id
 * @param {*} event
 * @returns
 */
const updateUser = async (event = {}) => {
  let response = {};
  try {
    userBean = JSON.parse(event.body);
    logger.trace('Entered UserApi::updateUser Method Execution %o', userBean);
    const {
      id,
    } = event.pathParameters;
    userBean.id = id;
    const result = await UserService.updateUser(userBean);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.debug('In UserApi::updateUser, API Response %o', response);
    logger.trace('Exit UserApi::updateUser Method Execution');
    return response;
  } catch (error) {
    logger.error('In UserApi::updateUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.debug('In UserApi::updateUser, API Response: %o', response);
    return response;
  }
};

/**
 * Api to delete user by id
 * @param {object} event
 * @returns {object} Response
 */
const deleteUser = async (event = {}) => {
  let response = {};
  try {
    const {
      id,
    } = event.pathParameters;
    logger.trace('Entered UserApi::deleteUser Method Execution %s', id);

    await UserService.deleteUser(id);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
      }),
    };
    logger.debug('In UserApi::deleteUser, API Response: %o', response);
    logger.trace('Exit UserApi::deleteUser Method Execution');
    return response;
  } catch (error) {
    logger.error('In UserApi::deleteUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.debug('In UserApi::deleteUser, API Response: %o', response);
    return response;
  }
};

/**
 * Api to login user
 * @param {object} event
 * @returns {object} Response
 */
const loginUser = async (event = {}) => {
  let response = {};
  try {
    userBean = JSON.parse(event.body);
    logger.trace('Entered UserApi::loginUser Method Execution %o', userBean);

    const result = await UserService.loginUser(userBean);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        ...result,
      }),
    };
    logger.debug('In UserApi::loginUser, API Response: %o', response);
    logger.trace('Exit UserApi::loginUser Method Execution');
    return response;
  } catch (error) {
    logger.error('In UserApi::loginUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    logger.debug('In UserApi::loginUser, API Response: %o', response);
    return response;
  }
};

module.exports = {
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
};
