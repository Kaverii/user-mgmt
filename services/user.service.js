const uuid = require('uuid').v1;

const ERROR_CODES = require('../common/constants/error-code.constant');
const BusinessException = require('../common/exception/business.exception');

const format = require('../utils/format.util');
const logger = require('../utils/logger.util');
const PasswordUtils = require('../utils/password.util');
const JwtUtils = require('../utils/jwt.util');

const UserDao = require('../dao/user.dao');

const {
  RegisterUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
} = require('../schema/user.dto');

class UserService {
  /**
   * Method to get user by id
   * @param {string} id
   * @returns Promise<any> - result or exception
   */
  static async getUser(id) {
    logger.trace('Enter UserService:getUser Service, Id: %s', id);
    const result = await UserDao.getUserById(id);

    if (!result.Item) {
      logger.error('In UserService:getUser Service, invalid user');
      throw new BusinessException(
        'UM4002E',
        format(ERROR_CODES.UM4002E, id),
      );
    }
    const user = result.Item;
    delete user.password;
    logger.trace('Exit UserService:getUser Service, Result: %o', user);
    return user;
  }

  /**
   * Method to register user
   * @param {object} user
   * @returns {Promise<object>} updated user
   */
  static async registerUser(user = {}) {
    logger.trace('Enter UserService:registerUser Service, User: %o', user);
    const validationResult = RegisterUserDtoSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService:registerUser Service, DTO validation result %o', validationResult);

    if (validationResult.error) {
      // On Invalid User
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.info('In UserService:registerUser Service, Validation Error on User %o', user);
      throw new BusinessException(
        'UM4001E',
        format(ERROR_CODES.UM4001E, errorMsgs),
      );
    }
    // On Valid User
    const existingUser = await UserDao.getUserByEmailId(user.emailId);

    // User Already present with emailid
    if (existingUser
      && existingUser.Items
      && existingUser.Items[0]
      && existingUser.Items[0].emailId) {
      logger.info('In UserService:registerUser Service, User already present with same emailid  %o', user);
      throw new BusinessException(
        'UM4004E',
        format(ERROR_CODES.UM4004E, existingUser.Items[0].emailId),
      );
    }

    const hashPassword = await PasswordUtils.hashPassword(user.password);
    const userDao = {
      ...user,
      id: uuid(),
      password: hashPassword,
    };
    const result = await UserDao.createUser(userDao);
    delete result.password;
    logger.trace('Exit UserService:registerUser Service, Result: %o', result);
    return result;
  }

  /**
   * Method to update user details
   * @param {object} user
   * @returns {Promise<object>} updated user
   */
  static async updateUser(user = {}) {
    logger.trace('Enter UserService:updateUser Service, User: %o', user);
    const validationResult = UpdateUserDtoSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService:updateUser Service, DTO validation result %o', validationResult);
    if (validationResult.error) {
      // On Invalid User
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.error('In UserService:updateUser Service, Validation Error on User %o', user);
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
    logger.trace('Exit UserService:updateUser Service, Result: %o', updatedUser);
    return updatedUser;
  }

  /**
   * Method to delete user by id
   * @param {string} id
   * @returns result
   */
  static async deleteUser(id) {
    logger.trace('Enter UserService:deleteUser Service, ID: %s', id);
    await this.getUser(id);
    const result = await UserDao.deleteUser(id);
    logger.trace('Exit UserService:deleteUser Service, Result: %o', result);
    return result;
  }

  /**
   * Method to login user
   * @param {object} user - user object
   * @returns result
   */
  static async loginUser(user = {}) {
    logger.trace('Enter UserService:loginUser Service, User: %o', user);
    const validationResult = LoginUserDtoSchema.validate(user, {
      abortEarly: false,
    });
    logger.debug('In UserService:loginUser Service, DTO validation result %o', validationResult);

    if (validationResult.error) {
      // On Invalid User DTO
      const errorMsgs = validationResult.error.details.map(
        (error) => error.message,
      );
      logger.error('In UserService:loginUser Service, Validation Error on User %o', user);
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

    logger.trace('Exit UserService:loginUser Service, Result: %o', token);
    return { token };
  }
}

module.exports = UserService;
