const AWS = require('aws-sdk');

/**
 * DB Utility class
 */
class DBUtils {
  /**
   * Method to get connection
   * @returns dbconnection object
   */
  static getConnection() {
    if (!this.dbConnection) {
      this.dbConnection = new AWS.DynamoDB.DocumentClient();
    }
    return this.dbConnection;
  }
}

module.exports = DBUtils;
