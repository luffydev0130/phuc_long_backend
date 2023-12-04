const { ProductTypes } = require('../models');

module.exports = {
  /**
   * Create new product type
   * @param {string} productTypeName
   * @returns {Promise}
   */
  createProductType: (productTypeName) => {
    return ProductTypes.create({ name: productTypeName });
  },

  /**
   * Get a product type by name
   * @param {string} productTypeName
   * @returns {Promise}
   */
  getProductTypeByName: (productTypeName) => {
    return ProductTypes.findOne({ name: { $regex: new RegExp('^' + productTypeName + '$', 'i') } });
  },

  getAllProductTypes: () => {
    return ProductTypes.find()
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },

  /**
   * Get product type by productTypeId
   * @param {string} productTypeId
   * @returns {Promise}
   */
  getProductTypeById: (productTypeId) => {
    return ProductTypes.findById(productTypeId).select({ __v: 0, updatedAt: 0 });
  },

  /**
   * Update product type
   * @param {string} productTypeId
   * @param {any} changes
   * @returns {Promise}
   */
  updateProductType: (productTypeId, changes) => {
    return ProductTypes.findByIdAndUpdate(productTypeId, changes, {
      new: true,
    }).select({ __v: 0, updatedAt: 0 });
  },

  /**
   * Update product type
   * @param {string} productTypeId
   * @returns {Promise}
   */
  deleteProductType: (productTypeId) => {
    return ProductTypes.deleteOne({ _id: productTypeId });
  },
};
