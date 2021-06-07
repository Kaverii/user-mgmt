// eslint-disable-next-line import/no-unresolved
const AWS = require('aws-sdk');
const logger = require('../utils/Logger');
const LOGGER_CODES = require('../constants/LoggerCodeConstants');
const ERROR_CODE_CONFIG = require('../constants/ErrorCodeConstants');
const SystemException = require('../utils/SystemException');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const USER_TABLE = process.env.USER_MGMT_TABLE;

class UserMgmtDao {
  /**
     * Method to get user
     */
  static async getUser(emailId) {
    const METHOD_NAME = 'UserMgmtDao::getUser';
    logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

    const params = {
      TableName: USER_TABLE,
      Key: {
        emailId,
      },
    };
    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.get(params);
      awsRequest.promise().then(
        (response) => {
          resolve(response);
        },
        (error) => {
          logger.error(LOGGER_CODES.LOG005, METHOD_NAME, JSON.stringify(error));
          reject(new SystemException(error.message, ERROR_CODE_CONFIG.ERR002, error.statusCode));
        },
      );
    });
  }

  /**
     * Method to register user
     */
  static async createUser(user) {
    const METHOD_NAME = 'UserMgmtDao::createUser';
    logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

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
          resolve(response);
        },
        (error) => {
          logger.error(LOGGER_CODES.LOG005, METHOD_NAME, JSON.stringify(error));
          reject(new SystemException(error.message, ERROR_CODE_CONFIG.ERR002, error.statusCode));
        },
      );
    });
  }

  /**
     * Method to update user
     */
  static async updateUser(user) {
    const METHOD_NAME = 'UserMgmtDao::updateUser';
    logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

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
        emailId: user.emailId,
      },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };

    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.update(params);
      awsRequest.promise().then(
        (response) => {
          resolve(response);
        },
        (error) => {
          logger.error(LOGGER_CODES.LOG005, METHOD_NAME, JSON.stringify(error));
          reject(new SystemException(error.message, ERROR_CODE_CONFIG.ERR002, error.statusCode));
        },
      );
    });
  }

  /**
     * Method to delete user
     */
  static async deleteUser(emailId) {
    const METHOD_NAME = 'UserMgmtDao::deleteUser';
    logger.debug(LOGGER_CODES.LOG001, METHOD_NAME);

    const params = {
      TableName: USER_TABLE,
      Key: {
        emailId,
      },
    };

    return new Promise((resolve, reject) => {
      const awsRequest = dynamoDb.delete(params);
      awsRequest.promise().then(
        (result) => {
          resolve(result);
        },
        (error) => {
          logger.error(LOGGER_CODES.LOG005, METHOD_NAME, JSON.stringify(error));
          reject(new SystemException(error.message, ERROR_CODE_CONFIG.ERR002, error.statusCode));
        },
      );
    });
  }
}

module.exports = UserMgmtDao;
