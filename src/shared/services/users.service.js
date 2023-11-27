const { Users } = require('../models');

module.exports = {
  /**
   * Get an user by email
   * @param {string} email
   * @returns {Promise}
   */
  getUserByEmail: (email) => {
    return Users.findOne({ email }).select('-password');
  },

  /**
   * Create a new user
   * @param {object} rawUser
   * @param {string} rawUser.email
   * @param {string} rawUser.password
   * @param {string} rawUser.fullName
   * @param {string} rawUser.phone
   * @param {string} rawUser.gender
   * @returns {Promise}
   */
  createUser: (rawUser) => {
    return Users.create(rawUser);
  },
};
