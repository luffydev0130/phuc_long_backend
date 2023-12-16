const { ProductsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

const createDefaultInfoForProduct = (product) => {
  return {
    ...product,
    defaultPrice: product.prices[0],
    defaultImage: product.images[0],
  };
};

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
      filterOptions.markers = { $in: markers };
    }

    const totalProducts = await ProductsService.getTotalProducts(filterOptions);
    const totalPages = Math.ceil(totalProducts / pageSize);
    const currentPage = Math.min(Math.max(1, parseInt(page, 10)), totalPages);

    let products = await ProductsService.getAllProducts(filterOptions, currentPage, pageSize);
    products = products.map((product) => createDefaultInfoForProduct(product._doc));
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: {
        products,
        pagination: {
          totalPages,
          currentPage,
          total: totalProducts,
          pageSize: parseInt(pageSize, 12),
        },
      },
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
        ? req.files.images.map((file) => `${process.env.HOST_NAME}/uploads/${file.filename}`)
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

  getProductById: catchAsyncFn(async (req, res, next) => {
    const product = await ProductsService.getProductById(req.params.productId);
    if (!product) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy sản phẩm nào có id: ${req.params.productId}`,
      );
    }
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: createDefaultInfoForProduct(product._doc),
    });
  }),

  handleUpdateProduct: catchAsyncFn(async (req, res, next) => {
    const product = await ProductsService.getProductById(req.params.productId);
    if (!product) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy sản phẩm có ID: ${req.params.productId}`,
      );
    }
    const sameNameProduct = await ProductsService.getProductByName(req.body.name);
    if (sameNameProduct && sameNameProduct._id.toString() !== req.params.productId) {
      throw httpResponseErrorUtils.createBadRequest('Tên sản phẩm đã tồn tại');
    }
    const { oldImages, ...rest } = req.body;
    const changes = {
      ...rest,
      images: [
        ...oldImages,
        ...(req.files.images
          ? req.files.images.map((file) => `${process.env.HOST_NAME}/uploads/${file.filename}`)
          : []),
      ],
    };

    const updatedProduct = await ProductsService.updateProduct(req.params.productId, changes);
    return res.status(200).json({
      status: 'Updated',
      statusCode: 200,
      responseData: updatedProduct,
    });
  }),

  handleDeleteProduct: catchAsyncFn(async (req, res, next) => {
    const product = await ProductsService.getProductById(req.params.productId);
    if (!product) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy sản phẩm nào có id: ${req.params.productId}`,
      );
    }
    await ProductsService.deleteProduct(req.params.productId);
    return res.status(204).send();
  }),
};
