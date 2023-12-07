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
      responseData: cart,
    });
  }),

  updateCart: catchAsyncFn(async (req, res, next) => {
    // Preprocessing data
    const currentCart = await CartsService.getCartByUserId(req.params.userId);
    if (!currentCart) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy giỏ hàng của người dùng có ID: ${req.params.userId}`,
      );
    }
    const { products } = req.body;
    // Extract new products
    const newProducts = products.filter((product) => {
      return !currentCart.products.find(
        (item) =>
          item.productId.toString() === product.productId.toString() && item.size === product.size,
      );
    });
    // Extract existed products
    const changedProducts = currentCart.products.reduce((results, currentProduct) => {
      delete currentProduct._id;
      const changedProduct = products.find(
        (prod) =>
          prod.productId.toString() === currentProduct.productId.toString() &&
          prod.size === currentProduct.size,
      );
      if (!changedProduct) {
        results.push(currentProduct);
      } else if (changedProduct.amount) {
        currentProduct.amount += parseInt(changedProduct.amount);
        results.push(currentProduct);
      }
      return results;
    }, []);

    const updatedCart = await CartsService.updateCart(req.params.userId, {
      products: [...changedProducts, ...newProducts],
    });
    // Return response
    return res.status(200).json({
      statusCode: 200,
      status: 'Updated',
      responseData: updatedCart,
    });
  }),
};
