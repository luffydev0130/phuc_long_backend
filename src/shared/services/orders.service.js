const { Orders } = require('../models');

module.exports = {
  createOrder: (payload) => {
    return Orders.create(payload);
  },

  getOrders: (queries, page, pageSize) => {
    return Orders.find(queries)
      .skip((page ? page - 1 : 0) * pageSize)
      .limit(pageSize)
      .select({ __v: 0, updatedAt: 0 })
      .sort([['createdAt', 'desc']]);
  },

  getTotalOrders: (queries) => {
    return Orders.countDocuments(queries);
  },
};
