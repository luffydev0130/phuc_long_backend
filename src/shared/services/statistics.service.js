const { Orders } = require('../models');

module.exports = {
  getOrdersByCreatedAt: (filter) => {
    return Orders.find(filter);
  },
};
