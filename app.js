/*
const userSchema = require('./dto-schemas/RegisterUserDtoSchema');
const validation = userSchema.validate({
  emailId: 'kaveri@gmail.com',
  username: 'kaveri34',
  fullName: 'Kaveri Jeevanantham',
  // password: 'P@ssw0rd1',
}, {
  abortEarly: false,
});
console.log(JSON.stringify(validation));
*/

/**
 * Update User
 */
/*
const UserMgmtApi = require('./api/UserMgmtApi');

const response = UserMgmtApi.updateUser({
  pathParameters: {
    emailId: 'kaveri@gmail.com',
  },
  body: {
    username: 'kaveri34',
    fullName: 'Kaveri Jeevanantham',
    password: 'P@ssw0rd1',
  },
});
console.log(JSON.stringify(response));
*/

/**
 * Password Util Test
 */
/*
const PasswordUtils = require("./utils/PasswordUtils");

PasswordUtils.hashPassword("P@ssw0rd1").then((hashPassword) => {
    console.log(hashPassword)
}).catch((err) => {
    console.log(err)
})

PasswordUtils.compare("P@ssw0rd1", "$2b$10$8V2MS9wea3FlOQnF2UalO.SFiRtpstl9cuErn65oVN9oWCaGXC/vq")
  .then((result) => {
    console.log(result)
  }).catch((err) => {
      console.log(err)
  })
*/
