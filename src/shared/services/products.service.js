const { Products } = require('../models');

module.exports = {
  createProduct: (payload) => {
    return Products.create(payload);
  },

  getAllProducts: () => {},

  getProductById: (productId) => {
    return Products.findById(productId)
      .populate({ path: 'productType', select: 'name' })
      .populate({ path: 'markers', select: 'name' });
  },
};
