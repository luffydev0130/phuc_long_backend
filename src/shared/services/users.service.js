const { Users } = require('../models');

module.exports = {
  /**
   * Get an user by email
   * @param {string} email
   * @returns {Promise}
   */
  getUserByEmail: (email) => {
    return Users.findOne({ email }).select({ __v: 0, updatedAt: 0 });
  },

  /**
   * Get an user by phone
   * @param {string} phone
   * @returns {Promise}
   */
  getUserByPhone: (phone) => {
    return Users.findOne({ phone }).select({ __v: 0, updatedAt: 0 });
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

  /**
   * Get all users
   * @returns {Promise}
   */
  getAllUsers: () => {
    return Users.find({})
      .select({ password: 0, __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },

  /**
   * Get user by id
   * @param {string} userId
   * @returns {Promise}
   */
  getUserById: (userId) => {
    return Users.findById(userId).select({ password: 0, __v: 0, updatedAt: 0 });
  },

  /**
   * Update user
   * @param {string} userId
   * @param {any} changes
   * @returns {Promise}
   */
  updateUser: (userId, changes) => {
    return Users.findByIdAndUpdate(userId, changes, { new: true }).select({
      password: 0,
      __v: 0,
      updatedAt: 0,
    });
  },

  deleteUser: (userId) => {
    return Users.deleteOne({ _id: userId });
  },
};
