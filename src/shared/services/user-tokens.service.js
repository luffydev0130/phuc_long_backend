const { UserTokens } = require('../models');

module.exports = {
  /**
   * Save refresh token to database
   * @param {string} userId
   * @param {string} refreshToken
   * @returns {Promise}
   */
  saveToken: (userId, refreshToken) => {
    return UserTokens.create({ userId, refreshToken });
  },

  /**
   * Get refresh token by userId
   * @param {string} userId
   * @returns {Promise}
   */
  getRefreshTokenByUserId: (userId) => {
    return UserTokens.findOne({ userId });
  },
};
