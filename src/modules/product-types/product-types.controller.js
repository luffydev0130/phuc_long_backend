const { ProductTypesService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  createProductType: catchAsyncFn(async (req, res, next) => {
    const existedType = await ProductTypesService.getProductTypeByName(req.body.productTypeName);
    if (existedType) {
      throw httpResponseErrorUtils.createBadRequest('Loại sản phẩm đã tồn tại');
    }
    const productType = await ProductTypesService.createProductType(req.body.productTypeName);
    return res.status(200).json({
      statusCode: 201,
      status: 'Created',
      responseData: productType,
    });
  }),

  getAllProductTypes: catchAsyncFn(async (req, res, next) => {
    const productTypes = await ProductTypesService.getAllProductTypes();
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: productTypes,
    });
  }),
};
