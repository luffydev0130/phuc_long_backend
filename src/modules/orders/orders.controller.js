const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { UsersService, OrdersService, CartsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils, sendMailUtils } = require('../../shared/utils');
const { createPlaceOrderSuccessfullyTemplate } = require('./orders.utils');

const SUBJECT = ' LaKong - Coffee & Teas - Đặt Hàng Thành Công';

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
    const queries = {};
    const { page = 1, pageSize = 10 } = req.query;
    for (const field in req.query) {
      switch (field) {
        case 'userId':
          queries[field] = req.query[field];
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
        default:
          throw httpResponseErrorUtils.createBadRequest(
            `Không hỗ trợ tìm kiếm đơn hàng theo trường: ${field}`,
          );
      }
    }

    const [totalOrders, orders] = await Promise.all([
      OrdersService.getTotalOrders(queries),
      OrdersService.getOrders(queries, page, pageSize),
    ]);

    return res.status(200).json({
      status: 'OK',
      statusCode: 200,
      responseData: {
        orders,
        pagination: {
          totalOrders,
          currentPage: page,
          totalPage: Math.ceil(totalOrders / pageSize),
          pageSize: parseInt(pageSize),
        },
      },
    });
  }),
};
