const { ProductsService } = require('../../shared/services');
const { catchAsyncFn } = require('../../shared/utils');

module.exports = {
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
    console.log(JSON.stringify(product));
    product = await ProductsService.getProductById(product._id);
    console.log(JSON.stringify(product));
    return res.status(201).json({
      statusCode: 201,
      status: 'Created',
      responseData: product,
    });
  }),
};
