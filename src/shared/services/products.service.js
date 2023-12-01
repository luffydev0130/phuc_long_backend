const { Products } = require('../models');

module.exports = {
  createProduct: (payload) => {
    return Products.create(payload);
  },

  getAllProducts: (filterOptions, page, pageSize) => {
    return Products.find(filterOptions)
      .populate('productType')
      .populate('markers')
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  },

  getProductById: (productId) => {
    return Products.findById(productId)
      .populate({ path: 'productType', select: 'name' })
      .populate({ path: 'markers', select: 'name' });
  },
};
