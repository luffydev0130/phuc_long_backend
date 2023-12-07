const { CartsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  getCartByUserId: catchAsyncFn(async (req, res, next) => {
    // Check existed cart
    const cart = await CartsService.getCartByUserId(req.params.userId);
    if (!cart) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy giỏ hàng với userId: ${req.params.userId}`,
      );
    }
    // Return response
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: cart._doc,
    });
  }),

  updateCart: catchAsyncFn(async (req, res, next) => {
    // Preprocessing data
    const changes = {};
    for (const field of Object.keys(req.body)) {
      switch (field) {
        case 'products': {
          changes.products = req.body.products;
          break;
        }
        default: {
          throw httpResponseErrorUtils.createBadRequest(
            `Không hỗ trợ cập nhật thông tin: ${field}`,
          );
        }
      }
    }

    return res.status(200).json({
      statusCode: 200,
      status: 'Updated',
      responseData: changes,
    });
  }),
};
