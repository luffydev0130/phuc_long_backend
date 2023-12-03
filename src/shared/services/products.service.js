const { Products } = require('../models');

module.exports = {
  /**
   * Create new product
   * @param {any} payload
   * @returns {Promise}
   */
  createProduct: (payload) => {
    return Products.create(payload);
  },

  /**
   * Get all products by filter options and support pagination
   * @param {any} filterOptions
   * @param {number} currentPage
   * @param {number} pageSize
   * @returns {Promise}
   */
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

  /**
   * Get product by productId
   * @param {string} productId
   * @returns {Promise}
   */
  getProductById: (productId) => {
    return Products.findById(productId)
      .populate({ path: 'productType', select: 'name' })
      .populate({ path: 'markers', select: 'name' })
      .select({ __v: 0, updatedAt: 0 });
  },

  /**
   * Get number of products
   * @param {any} filterOptions
   * @returns {Promise}
   */
  getTotalProducts: (filterOptions) => {
    return Products.countDocuments(filterOptions);
  },

  /**
   * Get product by productType
   * @param {string} productTypeId
   * @returns {Promise}
   */
  getProductByProductType: (productTypeId) => {
    return Products.findOne({ productType: productTypeId });
  },

  /**
   * Get product by marker
   * @param {string} markerId
   * @returns {Promise}
   */
  getProductByMarker: (markerId) => {
    return Products.findOne({ markers: { $in: [markerId] } });
  },
};
