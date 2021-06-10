const uuid = require('uuid').v1;

const ERROR_CODES = require('../common/constants/error-code.constant');
const BusinessException = require('../common/exception/business.exception');

const format = require('../utils/format.util');
const logger = require('../utils/logger.util');
const PasswordUtils = require('../utils/password.util');
const JwtUtils = require('../utils/jwt.util');

const RegisterUserDtoSchema = require('../dto-schemas/register-user.dto');
const UpdateUserDTOSchema = require('../dto-schemas/update-user.dto');
const LoginUserDTOSchema = require('../dto-schemas/login-user.dto');

const UserDao = require('../dao/user.dao');

class UserService {
  /**
   * Method to get user by id
   * @param {string} id
   * @returns Promise<any> - result or exception
   */
  static async getUser(id) {
    logger.trace('Entered UserService::getUser Method Execution %s', id);
    const result = await UserDao.getUserById(id);

    if (!result.Item) {
      logger.error('In UserService::getUser, invalid user');
      throw new BusinessException(
        'UM4002E',
        format(ERROR_CODES.UM4002E, id),
      );
    }
    const user = result.Item;
    delete user.password;
    logger.debug('In UserService::getUser, return value: %o', user);
    logger.trace('Exit UserMgmtAPI::getUser Method Execution Result: %o', user);
    return user;
  }

  /**
   * Method to register user
   */
  static async registerUser(user = {}) {
    logger.trace('Entered UserService::registerUser Method Execution %o', user);
    const validationResult = RegisterUserDtoSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService::registerUser, DTO validation result %o', validationResult);

    if (validationResult.error) {
      // On Invalid User
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.error('In UserService::registerUser, Validation Error on User %o', user);
      throw new BusinessException(
        'UM4001E',
        format(ERROR_CODES.UM4001E, errorMsgs),
      );
    }
    // On Valid User
    const hashPassword = await PasswordUtils.hashPassword(user.password);
    const userDao = {
      ...user,
      id: uuid(),
      password: hashPassword,
    };
    const result = await UserDao.createUser(userDao);
    delete result.password;
    logger.debug('In UserService::registerUser, return value: %o', result);
    logger.trace('Exit UserService::registerUser Method Execution with Result: %o', result);
    return result;
  }

  /**
   * Method to update user details
   * @param {object} user
   * @returns {Promise<object>} updated user
   */
  static async updateUser(user = {}) {
    logger.trace('Entered UserService::updateUser Method Execution %o', user);
    const validationResult = UpdateUserDTOSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService::updateUser, DTO validation result %o', validationResult);
    if (validationResult.error) {
      // On Invalid User
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.error('In UserService::updateUser, Validation Error on User %o', user);
      throw new BusinessException(
        'UM4001E',
        format(ERROR_CODES.UM4001E, errorMsgs),
      );
    }

    // On Valid User
    const userDao = {
      ...user,
    };
    if (user.password) {
      userDao.password = await PasswordUtils.hashPassword(user.password);
    }
    await this.getUser(userDao.id);
    const updatedUser = await UserDao.updateUser(userDao);
    delete updatedUser.password;
    logger.debug('In UserService::updateUser, return value: %o', updatedUser);
    logger.trace('Exit UserService::updateUser Method Execution with Result: %o', updatedUser);
    return updatedUser;
  }

  /**
   * Method to delete user by id
   * @param {string} id
   * @returns result
   */
  static async deleteUser(id) {
    logger.trace('Entered UserService::deleteUser Method Execution %s', id);
    await this.getUser(id);
    const result = await UserDao.deleteUser(id);
    logger.debug('In UserService::deleteUser, return value %o', result);
    logger.trace('Exit UserService::deleteUser Method Execution Result: %o', result);
    return result;
  }

  /**
   * Method to login user
   */
  static async loginUser(user = {}) {
    logger.trace('Entered UserService::loginUser Method Execution %o', user);
    const validationResult = LoginUserDTOSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService::loginUser, DTO validation result %o', validationResult);

    if (validationResult.error) {
      // On Invalid User DTO
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.error('In UserService::loginUser, Validation Error on User %o', user);
      throw new BusinessException(
        'UM4001E',
        format(ERROR_CODES.UM4001E, errorMsgs),
      );
    }
    // On Valid User DTO
    const result = await UserDao.getUserByEmailId(user.emailId);
    const hashPassword = result && result.Items && result.Items[0] && result.Items[0].password;

    if (!hashPassword
      || !(await PasswordUtils.compare(user.password, hashPassword))) {
      // Invalid User
      throw new BusinessException(
        'UM4003E',
        ERROR_CODES.UM4003E,
      );
    }

    const token = JwtUtils.signToken(result.Items[0].id);

    logger.debug('In UserService::loginUser, return value %o', token);
    logger.trace('Exit UserService::loginUser Method Execution with Result: %o', token);
    return { token };
  }
}

module.exports = UserService;
