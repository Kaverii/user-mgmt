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
    logger.trace('Enter UserAPI:getUser Id: %s', id);
    const result = await UserService.getUser(id);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.trace('Exit UserAPI:getUser Response: %o', response);
    return response;
  } catch (error) {
    logger.error('In UserAPI:getUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
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
    logger.trace('Enter UserAPI:registerUser %o', userBean);
    const result = await UserService.registerUser(userBean);
    response = {
      statusCode: STATUS_CODES.CREATED,
      body: JSON.stringify({
        success: true,
        result,
      }),
    };
    logger.trace('Exit UserAPI:registerUser Response: %o', response);
    return response;
  } catch (error) {
    logger.error('In UserAPI:registerUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
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
    logger.trace('Enter UserAPI:updateUser  User: %o', userBean);
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
    logger.trace('Exit UserAPI:updateUser Response: %o', response);
    return response;
  } catch (error) {
    logger.error('In UserAPI:updateUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    return response;
  }
};

/**
 * API to delete user by id
 * @param {object} event
 * @returns {object} Response
 */
const deleteUser = async (event = {}) => {
  let response = {};
  try {
    const {
      id,
    } = event.pathParameters;
    logger.trace('Enter UserAPI:deleteUser  Id: %s', id);

    await UserService.deleteUser(id);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
      }),
    };
    logger.trace('Exit UserAPI:deleteUser Response: %o', response);
    return response;
  } catch (error) {
    logger.error('In UserAPI:deleteUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
    return response;
  }
};

/**
 * API to login user
 * @param {object} event
 * @returns {object} Response
 */
const loginUser = async (event = {}) => {
  let response = {};
  try {
    userBean = JSON.parse(event.body);
    logger.trace('Enter UserAPI:loginUser  User: %o', userBean);

    const result = await UserService.loginUser(userBean);
    response = {
      statusCode: STATUS_CODES.SUCCESS,
      body: JSON.stringify({
        success: true,
        ...result,
      }),
    };
    logger.trace('Exit UserAPI:loginUser Response: %o', response);
    return response;
  } catch (error) {
    logger.error('In UserAPI:loginUser, %o', error);
    response = {
      statusCode: error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
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
