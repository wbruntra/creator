const util = require('util');
const bcrypt = require('bcrypt');
const bcryptVerify = util.promisify(bcrypt.compare);

const timeNow = () => {
  return Math.round(new Date().getTime() / 1000);
};

module.exports = {
  bcryptVerify,
  timeNow,
};
