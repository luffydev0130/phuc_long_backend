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
    return ProductTypes.findOne({ name: new RegExp(productTypeName, 'ig') });
  },

  getAllProductTypes: () => {
    return ProductTypes.find()
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },
};
