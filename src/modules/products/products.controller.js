const { ProductsService } = require('../../shared/services');
const { catchAsyncFn } = require('../../shared/utils');

module.exports = {
  getAllProducts: catchAsyncFn(async (req, res, next) => {
    const { name, productType, markers, page, pageSize } = req.query;
    const filterOptions = {};
    if (name) {
      filterOptions.name = new RegExp(name, 'i');
    }
    if (productType) {
      filterOptions.productType = productType;
    }
    if (markers) {
      filterOptions.markers = markers;
    }
    const products = await ProductsService.getAllProducts(filterOptions, page, pageSize);
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: products,
    });
  }),

  handleCreateProduct: catchAsyncFn(async (req, res, next) => {
    const payload = {
      name: req.body.name,
      desc: req.body.desc,
      markers: req.body.markers || [],
      prices: req.body.prices || [],
      productType: req.body.productType,
      images: req.files.images
        ? req.files.images.map((file) => `${req.hostname}/uploads/${file.filename}`)
        : [],
    };
    let product = await ProductsService.createProduct(payload);
    product = await ProductsService.getProductById(product._id);
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
      responseData: product,
    });
  }),
};
