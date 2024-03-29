const _ = require('lodash');
const moment = require('moment');
const { catchAsyncFn } = require('../../shared/utils');
const { StatisticsService } = require('../../shared/services');

module.exports = {
  handleCalculateStatistics: catchAsyncFn(async (req, res, next) => {
    const { startDate, endDate, statisticBy = 'date', orderStatus } = req.query;
    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: moment(req.query.startDate).utc().startOf('day').toDate(),
        $lte: moment(req.query.endDate).utc().endOf('day').toDate(),
      };
    } else if (startDate) {
      filter.createdAt = { $gte: moment(req.query.startDate).utc().startOf('day').toDate() };
    } else if (endDate) {
      filter.createdAt = { $lte: moment(req.query.endDate).utc().endOf('day').toDate() };
    }
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    const orders = await StatisticsService.getOrdersByCreatedAt(filter);

    let groupedOrders;
    switch (statisticBy) {
      case 'date':
        groupedOrders = _.groupBy(orders, (order) => moment(order.createdAt).format('DD-MM-YYYY'));
        break;
      case 'month':
        groupedOrders = _.groupBy(orders, (order) => moment(order.createdAt).format('MM-YYYY'));
        break;
      case 'year':
        groupedOrders = _.groupBy(orders, (order) => moment(order.createdAt).format('YYYY'));
        break;
      default:
        throw new Error(`Không hỗ trợ thống kê theo: ${statisticBy}`);
    }

    const results = {};
    for (const [group, orders] of Object.entries(groupedOrders)) {
      results[group] = orders.reduce((total, order) => total + order.totalBill, 0);
    }

    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: results,
    });
  }),
};
