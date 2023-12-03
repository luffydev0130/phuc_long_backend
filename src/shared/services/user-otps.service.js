const { UserOtps } = require('../models');

module.exports = {
  /**
   * Create new otp
   * @param {any} payload
   * @returns {Promise}
   */
  createOtp: (payload) => {
    return UserOtps.create(payload);
  },

  /**
   * Get user otp by id
   * @param {string} userOtpId
   * @returns {Promise}
   */
  getOtpById: (userOtpId) => {
    return UserOtps.findById(userOtpId);
  },

  /**
   * Get user otp  userId
   * @param {string} userId
   * @returns {Promise}
   */
  getOtpByUserId: (userId) => {
    return UserOtps.findOne({ userId });
  },

  /**
   * Update otp
   * @param {string} userOtpId
   * @param {any} changes
   * @returns {Promise}
   */
  updateOtpByUserId: (userId, changes) => {
    return UserOtps.findOneAndUpdate({ userId }, changes, { new: true });
  },

  /**
   * Delete otp by userId
   * @param {string} userId
   * @returns {Promise}
   */
  deleteOtpByUserId: (userId) => {
    return UserOtps.deleteOne({ userId });
  },
};
