const { Products } = require('../models');

module.exports = {
  createProduct: (payload) => {
    return Products.create(payload);
  },

  getAllProducts: (filterOptions, currentPage, pageSize) => {
    return Products.find(filterOptions)
      .populate({
        path: 'productType',
        select: 'name',
      })
      .populate({
        path: 'markers',
        select: 'name',
      })
      .skip((currentPage ? currentPage - 1 : 0) * pageSize)
      .limit(pageSize)
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },

  getProductById: (productId) => {
    return Products.findById(productId)
      .populate({ path: 'productType', select: 'name' })
      .populate({ path: 'markers', select: 'name' })
      .select({ __v: 0, updatedAt: 0 });
  },

  getTotalProducts: (filterOptions) => {
    return Products.countDocuments(filterOptions);
  },
};
