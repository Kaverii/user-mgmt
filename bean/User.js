/**
 * User Bean
 */
/* class User {
  constructor() {
    emailId !== undefined && (this.emailId = emailId); // String
    username !== undefined && (this.username = username); // String
    fullName !== undefined && (this.fullName = fullName); // String
    password !== undefined && (this.password = password); // String
  }
} */
function User(emailId, username, fullName, password) {
  const user = JSON.parse(JSON.stringify({
    emailId,
    username,
    fullName,
    password,
  }));
  return {
    ...user,
  };
}
module.exports = User;
