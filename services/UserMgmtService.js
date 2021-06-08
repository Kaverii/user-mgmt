const ERROR_CODE_CONFIG = require('../common/constants/ErrorCodeConstants');
const ERROR_MSGS = require('../common/constants/ErrorMsgConstants');
const LOGGER_CODES = require('../common/constants/LoggerCodeConstants');

const Logger = require('../utils/Logger');
const BusinessException = require('../common/exception/BusinessException');
const PasswordUtils = require('../utils/PasswordUtils');

const RegisterUserDtoSchema = require('../dto-schemas/RegisterUserDtoSchema');
const UpdateUserDTOSchema = require('../dto-schemas/UpdateUserDtoSchema');

const UserMgmtDao = require('../dao/UserMgmtDao');
const User = require('../bean/User');

class UserMgmtService {
  /**
   * Method to get user by emailid
   * @param {string} emailId
   * @returns Promise<any> - result or exception
   */
  static async getUser(emailId) {
    const METHOD_NAME = 'UserMgmtService::getUser';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);
    const result = await UserMgmtDao.getUser(emailId);
    if (!result.Item) {
      Logger.error(LOGGER_CODES.LOG009, METHOD_NAME);
      Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
      throw new BusinessException(
        ERROR_MSGS.INVALID_USER,
        ERROR_CODE_CONFIG.ERR004.TYPE,
        ERROR_CODE_CONFIG.ERR004.STATUS_CODE,
      );
    }
    Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return result;
  }

  /**
   * Method to register user
   */
  static async registerUser(user = {}) {
    const METHOD_NAME = 'UserMgmtService::registerUser';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

    const validationResult = RegisterUserDtoSchema.validate(user, {
      abortEarly: false,
    });
    Logger.trace(LOGGER_CODES.LOG010, validationResult);

    // On Valid User
    if (!validationResult.error) {
      const hashPassword = await PasswordUtils.hashPassword(user.password);
      const userDao = new User(
        user.emailId,
        user.username,
        user.fullName,
        hashPassword,
      );
      Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
      const result = await UserMgmtDao.createUser(userDao);
      return result;
    }
    // On Invalid User
    const errorMsgs = validationResult.error.details.map(
      (error) => error.message,
    );
    Logger.error(LOGGER_CODES.LOG004, METHOD_NAME, errorMsgs);
    Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);

    throw new BusinessException(
      JSON.stringify(errorMsgs),
      ERROR_CODE_CONFIG.ERR001.TYPE,
      ERROR_CODE_CONFIG.ERR001.STATUS_CODE,
    );
  }

  /**
   * Method to update user details
   * @param {object} user
   * @returns {Promise<object>} updated user
   */
  static async updateUser(user = {}) {
    const METHOD_NAME = 'UserMgmtService::updateUser';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);
    const validationResult = UpdateUserDTOSchema.validate(user, {
      abortEarly: false,
    });
    Logger.trace(LOGGER_CODES.LOG010, validationResult);
    // On Valid User
    if (!validationResult.error) {
      let hashPassword;
      if (user.password)(hashPassword = await PasswordUtils.hashPassword(user.password));
      const userDao = new User(
        user.emailId,
        user.username,
        user.fullName,
        hashPassword,
      );
      await this.getUser(userDao.emailId);
      const updatedUser = await UserMgmtDao.updateUser(userDao);
      updatedUser.password = null;

      Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
      return updatedUser;
    }
    // On Invalid User
    const errorMsgs = validationResult.error.details.map(
      (error) => error.message,
    );
    Logger.error(LOGGER_CODES.LOG008, METHOD_NAME, errorMsgs);
    Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);

    throw new BusinessException(
      JSON.stringify(errorMsgs),
      ERROR_CODE_CONFIG.ERR001.TYPE,
      ERROR_CODE_CONFIG.ERR001.STATUS_CODE,
    );
  }

  /**
   * Method to delete user by emailId
   * @param {string} emailId
   * @returns result
   */
  static async deleteUser(emailId) {
    const METHOD_NAME = 'UserMgmtService::deleteUser';
    Logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);
    await this.getUser(emailId);
    const result = await UserMgmtDao.deleteUser(emailId);
    Logger.debug(LOGGER_CODES.LOG002, METHOD_NAME);
    return result;
  }
}

module.exports = UserMgmtService;
