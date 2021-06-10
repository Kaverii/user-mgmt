/**
 * Constants for error code config
 */
const ERROR_CODE_CONFIG = {
  // Business Exceptions
  UM4001E: 'UM4001E: User Validation Failed {0}',
  UM4002E: 'UM4002E: Invalid User Id {0}',
  UM4003E: 'UM4003E: Invalid credentials!',
  UM4004E: 'UM4004E: User Already exist with emailid {0}',

  // System Exceptions
  UM5001E: 'UM5001E: Exception during password hasing {0}',
  UM5002E: 'UM5002E: DB Query Execution Error {0}',
};

module.exports = ERROR_CODE_CONFIG;
