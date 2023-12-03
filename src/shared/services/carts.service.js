const { Carts } = require('../models');

module.exports = {
  /**
   * Create new cart
   * @param {any} payload
   * @returns {Promise}
   */
  createCart: (payload) => {
    return Carts.create(payload);
  },

  /**
   * Get cart by id
   * @param {string} cartId
   * @returns {Promise}
   */
  getCartByUserId: (userId) => {
    return Carts.findOne({ userId })
      .populate({
        path: 'Products',
      })
      .select({ __v: 0, updatedAt: 0 });
  },

  updateCart: (userId, changes) => {
    return Carts.findByIdAndUpdate({ _id: userId }, changes, { new: true })
      .select({
        __v: 0,
        updatedAt: 0,
      })
      .populate({
        path: 'Products',
      });
  },
};
