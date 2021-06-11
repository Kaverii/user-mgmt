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
    logger.trace('Enter UserDao:getUserById DAO, Id: %s', id);
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
          logger.trace('Exit UserDao:getUserById DAO, Response: %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao:getUserById DAO, DB Error: %o', error);
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
    logger.trace('Enter UserDao:getUserByEmailId DAO, EmailId: %s', emailId);
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
          logger.trace('Exit UserDao:getUserByEmailId DAO, Result %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao:getUserByEmailId DAO, DB Error: %o', error);
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
    logger.trace('Enter UserDao:createUser DAO, User: %o', user);
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
          logger.trace('Exit UserDao:createUser DAO, Result %o', response);
          resolve(user);
        },
        (error) => {
          logger.error('In UserDao:createUser DAO, DB Error: %o', error);
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
    logger.trace('Enter UserDao:updateUser DAO, User: %o', user);

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
          logger.trace('Exit UserDao:updateUser DAO, Result %o', response);
          resolve(response);
        },
        (error) => {
          logger.error('In UserDao:updateUser DAO, DB Error: %o', error);
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
   * @returns {Promise<object>} - result deleted user object | db exception
   */
  static async deleteUser(id) {
    logger.trace('Enter UserDao:deleteUser DAO, ID: %s', id);

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
          logger.trace('Exit UserDao:deleteUser DAO, Result %o', result);
          resolve(result);
        },
        (error) => {
          logger.error('In UserDao:deleteUser DAO, DB Error: %o', error);
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
