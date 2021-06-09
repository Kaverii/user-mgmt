const ERROR_CODE_CONFIG = require('../common/constants/error-code.constant');
const SystemException = require('../common/exception/system.exception');
const logger = require('../utils/logger.util');
const format = require('../utils/format.util');
const DBUtils = require('../utils/db.util');

const dynamoDb = DBUtils.getConnection();

const { USER_TABLE, USER_EMAIL_ID_INDEX } = process.env;

class UserDao {
  /**
   * Method to get user by id
   * @param {string} id
   * @returns {Promise<any>} - user object as result | db exception
   */
  static async getUserById(id) {
    logger.trace('Entered UserDao::getUserById Method Execution %s', id);
    const params = {
      TableName: USER_TABLE,
      Key: {
        id,
      },
    };
    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.get(params);
      awsRequest.promise().then(
        (response) => {
          logger.trace('Exit UserDao::getUserById Method Execution with Result %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao::getUserById, DB Error: %o', error);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5002E, error),
            error.statusCode,
          ));
        },
      );
    });
  }

  /**
   * Method to get user by emailId
   * @param {string} emailId
   * @returns {Promise<any>} - user object as result | db exception
   */
  static async getUserByEmailId(emailId) {
    logger.trace('Entered UserDao::getUserByEmailId Method Execution %s', emailId);
    const params = {
      TableName: USER_TABLE,
      IndexName: USER_EMAIL_ID_INDEX,
      KeyConditionExpression: 'emailId = :emailId',
      ExpressionAttributeValues: { ':emailId': emailId },
    };
    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.query(params);
      awsRequest.promise().then(
        (response) => {
          logger.trace('Exit UserDao::getUserByEmailId Method Execution with Result %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao::getUserByEmailId, DB Error: %o', error);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5002E, error),
            error.statusCode,
          ));
        },
      );
    });
  }

  /**
   * Method to register user
   * @param {object} user - user bean
   * @returns {Promise<object>} - result created user object | db exception
   */
  static async createUser(user) {
    logger.trace('Entered UserDao::createUser Method Execution %o', user);
    const params = {
      TableName: USER_TABLE,
      Item: {
        ...user,
      },
    };
    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.put(params);
      awsRequest.promise().then(
        (response) => {
          logger.trace('Exit UserDao::createUser Method Execution with Result %o', response);
          resolve(user);
        },
        (error) => {
          logger.error('In UserDao::createUser, DB Error: %o', error);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5002E, error),
            error.statusCode,
          ));
        },
      );
    });
  }

  /**
   * Method to update user by id
   * @param {object} user - user bean
   * @returns {Promise<object>} - result created user object | db exception
   */
  static async updateUser(user) {
    logger.trace('Entered UserDao::updateUser Method Execution %o', user);

    // Constructing expression attribute values
    const userFields = ['username', 'fullName', 'password']
      .filter((fieldName) => user[fieldName]);

    const updateExpression = userFields.map((fieldName) => `${fieldName}=:${fieldName}`).join(', ');
    const expressionAttributeValues = {};
    userFields.forEach((fieldName) => {
      expressionAttributeValues[`:${fieldName}`] = user[fieldName];
    });

    const params = {
      TableName: USER_TABLE,
      Key: {
        id: user.id,
      },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };

    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.update(params);
      awsRequest.promise().then(
        (response) => {
          logger.trace('Exit UserDao::updateUser Method Execution with Result %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao::updateUser, DB Error: %o', error);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5002E, error),
            error.statusCode,
          ));
        },
      );
    });
  }

  /**
   * Method to delete user by id
   * @param {string} id
   * @returns
   */
  static async deleteUser(id) {
    logger.trace('Entered UserDao::deleteUser Method Execution %s', id);

    const params = {
      TableName: USER_TABLE,
      Key: {
        id,
      },
    };

    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.delete(params);
      awsRequest.promise().then(
        (result) => {
          logger.trace('Exit UserDao::deleteUser Method Execution with Result %o', result);
          resolve(result);
        },
        (error) => {
          logger.error('In UserDao::deleteUser, DB Error: %o', error);
          reject(new SystemException(
            'UM5002E',
            format(ERROR_CODE_CONFIG.UM5002E, error),
            error.statusCode,
          ));
        },
      );
    });
  }
}

module.exports = UserDao;
