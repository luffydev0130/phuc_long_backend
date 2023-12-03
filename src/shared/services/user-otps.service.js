const { UserOtps } = require('../models');

module.exports = {
  createOtp: (payload) => {
    return UserOtps.create(payload);
  },
};
