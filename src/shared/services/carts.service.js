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
  getCartByUserId: async (userId) => {
    const cart = await Carts.findOne({ userId })
      .select({ __v: 0, updatedAt: 0 })
      .populate({
        path: 'products.productId',
        model: 'Products',
      })
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
    if (cart) {
      cart._doc.products = cart.products.map((item) => {
        const { productId: productDetail, size, amount, image, _id } = item;
        const priceDetail = productDetail._doc.prices.find((item) => item.size === size);
        return {
          _id,
          size,
          image,
          amount,
          productId: productDetail._doc._id,
          productName: productDetail._doc.name,
          price: priceDetail.price,
          totalPrice: priceDetail.price * amount,
        };
      });
    }
    return cart;
  },

  updateCart: async (userId, changes) => {
    const updatedCart = await Carts.findOneAndUpdate({ userId }, changes, { new: true })
      .select({
        __v: 0,
        updatedAt: 0,
      })
      .populate({
        path: 'products.productId',
        model: 'Products',
      })
      .sort([['createdAt', 'desc']]);
    if (updatedCart) {
      updatedCart._doc.products = updatedCart.products.map((item) => {
        const { productId: productDetail, size, amount, image, _id, comment } = item;
        const priceDetail = productDetail._doc.prices.find((item) => item.size === size);
        return {
          _id,
          size,
          image,
          amount,
          comment,
          productId: productDetail._doc._id,
          productName: productDetail._doc.name,
          price: priceDetail.price,
          totalPrice: priceDetail.price * amount,
        };
      });
    }
    return updatedCart;
  },
};
