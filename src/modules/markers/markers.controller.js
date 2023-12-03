const { MarkersService, ProductsService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  createMarker: catchAsyncFn(async (req, res, next) => {
    const existedType = await MarkersService.getMarkerByName(req.body.markerName);
    if (existedType) {
      throw httpResponseErrorUtils.createBadRequest('Marker đã tồn tại');
    }
    const marker = await MarkersService.createMarker(req.body.markerName);
    delete marker._doc['__v'];
    delete marker._doc['updatedAt'];
    return res.status(200).json({
      statusCode: 201,
      status: 'Created',
      responseData: marker,
    });
  }),

  getAllMarkers: catchAsyncFn(async (req, res, next) => {
    const markers = await MarkersService.getAllMarkers();
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: markers,
    });
  }),

  getMarkerById: catchAsyncFn(async (req, res, next) => {
    const marker = await MarkersService.getMarkerById(req.params.markerId);
    if (!marker) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy marker với id: ${req.params.markerId}`,
      );
    }
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      responseData: marker,
    });
  }),

  updateMarker: catchAsyncFn(async (req, res, next) => {
    const [existedMarker, currentMarker] = await Promise.all([
      MarkersService.getMarkerByName(req.body.markerName),
      MarkersService.getMarkerById(req.params.markerId),
    ]);
    if (!currentMarker) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy marker với id: ${req.params.markerId}`,
      );
    }
    if (existedMarker) {
      throw httpResponseErrorUtils.createBadRequest('Marker đã tồn tại');
    }
    const updatedMarker = await MarkersService.updateMarker(req.params.markerId, {
      name: req.body.markerName,
    });
    return res.status(200).json({
      statusCode: 200,
      status: 'Updated',
      responseData: updatedMarker,
    });
  }),

  deleteMarker: catchAsyncFn(async (req, res, next) => {
    const [marker, product] = await Promise.all([
      MarkersService.getMarkerById(req.params.markerId),
      ProductsService.getProductByMarker(req.params.markerId),
    ]);
    if (!marker) {
      throw httpResponseErrorUtils.createNotFound(
        `Không tìm thấy marker với id: ${req.params.markerId}`,
      );
    }
    if (product) {
      throw httpResponseErrorUtils.createBadRequest(
        'Không thể xoá marker này vì đang có sản phẩm tồn tại',
      );
    }
    await MarkersService.deleteMarker(req.params.markerId);
    return res.status(204).send();
  }),
};
