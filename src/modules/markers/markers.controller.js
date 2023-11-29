const { MarkersService } = require('../../shared/services');
const { catchAsyncFn, httpResponseErrorUtils } = require('../../shared/utils');

module.exports = {
  createMarker: catchAsyncFn(async (req, res, next) => {
    const existedType = await MarkersService.getMarkerByName(req.body.markerName);
    if (existedType) {
      throw httpResponseErrorUtils.createBadRequest('Marker đã tồn tại');
    }
    const marker = await MarkersService.createMarker(req.body.markerName);
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
};
