const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { UsersService, OrdersService, CartsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils, sendMailUtils } = require('../../shared/utils');
const { createPlaceOrderSuccessfullyTemplate } = require('./orders.utils');

module.exports = {
  handleSetUpPaymentIntent: catchAsyncFn(async (req, res, next) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: +req.body.totalBill,
      currency: 'vnd',
      payment_method_types: ['card'],
    });
    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: paymentIntent,
    });
  }),

  handleCreateOrder: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserById(req.body.userId);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng có ID: ${req.body.userId}`,
      );
    }

    const template = createPlaceOrderSuccessfullyTemplate(req.body);

    const [order] = await Promise.all([
      OrdersService.createOrder(req.body),
      CartsService.updateCart(user._id, { products: [] }),
      sendMailUtils(user.email, 'LaKong - Coffee & Teas - Đặt hàng thành công', template),
    ]);
    return res.status(201).json({
      status: 'Created',
      statusCode: 201,
      responseData: { orderId: order._id },
    });
  }),

  handleGetOrders: catchAsyncFn(async (req, res, next) => {
    const filterObj = Object.keys(req.query).reduce((results, field) => {
      const val = req.query[field];
      if (val) {
        results[field] = val;
      }
      return results;
    }, {});

    const queries = {};
    for (const field in filterObj) {
      switch (field) {
        case 'search':
          const regex = new RegExp(req.query[field], 'i');
          queries['$or'] = [{ fullName: regex }, { phone: regex }];
          break;
        case 'fullName':
          queries[field] = { $regex: new RegExp(req.query[field], 'i') };
          break;
        case 'phone':
          queries[field] = req.query[field];
          break;
        case 'paymentMethod':
          queries[field] = req.query[field];
          break;
        case 'paymentStatus':
          queries[field] = req.query[field];
          break;
        case 'deliveryType':
          queries[field] = req.query[field];
          break;
        case 'deliveryStatus':
          queries[field] = req.query[field];
          break;
        case 'orderStatus':
          queries[field] = req.query[field];
          break;
        case 'startDate': {
          const date = moment(req.query.startDate).utc().startOf('day').toDate();
          if (queries.createdAt) {
            queries.createdAt.$gte = date;
          } else {
            queries.createdAt = { $gte: date };
          }
          break;
        }
        case 'endDate': {
          const date = moment(req.query.endDate).utc().endOf('day').toDate();
          if (queries.createdAt) {
            queries.createdAt.$lte = date;
          }
          queries.createdAt = { $lte: date };
          break;
        }
        default:
          throw httpResponseErrorUtils.createBadRequest(
            `Không hỗ trợ tìm kiếm đơn hàng theo trường: ${field}`,
          );
      }
    }

    const orders = await OrdersService.getOrders(queries);

    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: orders,
    });
  }),

  handleGetOrderByUserId: catchAsyncFn(async (req, res, next) => {
    const user = await UsersService.getUserById(req.params.userId);
    if (!user) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy người dùng có ID: ${req.params.userId}`,
      );
    }

    const orders = await OrdersService.getOrdersByUserId(req.params.userId);
    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: orders,
    });
  }),

  handleUpdateOrder: catchAsyncFn(async (req, res, next) => {
    const order = await OrdersService.getOrderByOrderId(req.params.orderId);

    if (!order) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy đơn hàng với mã: ${req.params.orderId}`,
      );
    }

    const fields = Object.keys(req.body);
    if (!fields.length) {
      throw httpResponseErrorUtils.createBadRequest(
        'Vui lòng cung cấp thông tin bạn muốn cập nhật cho đơn hàng',
      );
    }

    const changes = {};
    for (const field of fields) {
      switch (field) {
        case 'paymentStatus': {
          changes.paymentStatus = req.body.paymentStatus;
          break;
        }
        case 'deliveryStatus': {
          changes.deliveryStatus = req.body.deliveryStatus;
          break;
        }
        case 'orderStatus': {
          changes.orderStatus = req.body.orderStatus;
          break;
        }
        case 'notes': {
          changes.notes = req.body.notes;
          break;
        }
      }
    }

    const updatedOrder = await OrdersService.updateOrder(req.params.orderId, {
      ...changes,
      createdAt: new Date(),
    });
    return res.status(200).json({
      status: 'Update',
      statusCode: 200,
      responseData: updatedOrder,
    });
  }),
};
