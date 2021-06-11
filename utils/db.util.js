const AWS = require('aws-sdk');
const logger = require('./logger.util');

/**
 * DB Utility class
 */
class DBUtils {
  /**
   * Method to get connection
   * @returns dbconnection object
   */
  static getConnection() {
    logger.trace('Enter DBUtils:getConnection Util');
    if (!this.dbConnection) {
      this.dbConnection = new AWS.DynamoDB.DocumentClient();
    }
    logger.trace('Exit DBUtils:getConnection Util');
    return this.dbConnection;
  }
}

module.exports = DBUtils;
