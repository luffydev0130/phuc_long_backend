const { ProductTypesService, ProductsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  createProductType: catchAsyncFn(async (req, res, next) => {
    const existedType = await ProductTypesService.getProductTypeByName(req.body.productTypeName);
    if (existedType) {
      throw httpResponseErrorUtils.createBadRequest('Loại sản phẩm đã tồn tại');
    }
    const productType = await ProductTypesService.createProductType(req.body.productTypeName);
    delete productType._doc['__v'];
    delete productType._doc['updatedAt'];
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

  getProductTypeById: catchAsyncFn(async (req, res, next) => {
    const productType = await ProductTypesService.getProductTypeById(req.params.productTypeId);
    if (!productType) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy loại sản phẩm với id: ${req.params.productTypeId}`,
      );
    }
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: productType,
    });
  }),

  updateProductType: catchAsyncFn(async (req, res, next) => {
    const [existedProductType, currentProductType] = await Promise.all([
      ProductTypesService.getProductTypeByName(req.body.productTypeName),
      ProductTypesService.getProductTypeById(req.params.productTypeId),
    ]);
    if (!currentProductType) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy loại sản phẩm với id: ${req.params.productTypeId}`,
      );
    }
    if (existedProductType) {
      throw httpResponseErrorUtils.createBadRequest('Loại sản phẩm đã tồn tại');
    }
    const updateProductType = await ProductTypesService.updateProductType(
      req.params.productTypeId,
      {
        name: req.body.productTypeName,
      },
    );
    return res.status(200).json({
      statusCode: 200,
      status: 'Updated',
      responseData: updateProductType,
    });
  }),

  deleteProductType: catchAsyncFn(async (req, res, next) => {
    const [productType, product] = await Promise.all([
      ProductTypesService.getProductTypeById(req.params.productTypeId),
      ProductsService.getProductByProductType(req.params.productTypeId),
    ]);
    if (!productType) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy loại sản phẩm với id: ${req.params.productTypeId}`,
      );
    }
    if (product) {
      throw httpResponseErrorUtils.createBadRequest(
        `Không thể xoá loại sản phẩm này vì đang có sản phẩm tồn tại`,
      );
    }
    await ProductTypesService.deleteProductType(req.params.productTypeId);
    return res.status(204).send();
  }),
};
